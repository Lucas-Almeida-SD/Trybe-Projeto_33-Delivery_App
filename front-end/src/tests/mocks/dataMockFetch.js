import fs from 'fs';
import path from 'path';
import products from '../helpers/products';
import sales from '../helpers/sales.json';
import users from '../helpers/users';
import sellers from '../helpers/sellers';

const loginURL = 'http://localhost:3001/login';
const createUserURL = 'http://localhost:3001/user';
const createSaleURL = 'http://localhost:3001/sales';
const getAllProductsURL = 'http://localhost:3001/products';
const getAllSalesByCustomerURL = 'http://localhost:3001/sales';
const getAllSalesBySellerURL = 'http://localhost:3001/sales/seller';
const getSaleByIdURL = /^http:\/\/localhost:3001\/sales\/[0-9]{1,}$/;
const getAllSellersURL = 'http://localhost:3001/user/seller';
const updateSaleURL = /^http:\/\/localhost:3001\/sales\/[0-9]{1,}$/;

const methodGET = 'GET';
const methodPOST = 'POST';
const methodPATCH = 'PATCH';

// eslint-disable-next-line react-func/max-lines-per-function
const mockFetchSuccess = (url, options) => {
  if (url === loginURL) {
    const findUser = users.find((user) => user.email === JSON.parse(options.body).email);
    return Promise.resolve({
      json: () => Promise.resolve(findUser),
    });
  }

  if (url === createUserURL) {
    return Promise.resolve({
      json: () => Promise.resolve(users[2]),
    });
  }

  if (url === createSaleURL && options.method === methodPOST) {
    return Promise.resolve({
      json: () => Promise.resolve(sales[0]),
    });
  }

  if (url === getAllProductsURL) {
    return Promise.resolve({
      json: () => Promise.resolve(products),
    });
  }

  if (url === getAllSalesByCustomerURL && options.method === methodGET) {
    return Promise.resolve({
      json: () => Promise.resolve(sales),
    });
  }

  if (url === getAllSalesBySellerURL) {
    return Promise.resolve({
      json: () => Promise.resolve(sales),
    });
  }

  if (url === getAllSellersURL) {
    return Promise.resolve({
      json: () => Promise.resolve(sellers),
    });
  }

  const splitURL = url.split('/');
  const id = splitURL[splitURL.length - 1];

  if (getSaleByIdURL.test(url) && options.method === methodGET) {
    const findSale = sales.find((sale) => sale.id === Number(id));

    return Promise.resolve({
      json: () => Promise.resolve(findSale),
    });
  }

  if (updateSaleURL.test(url) && options.method === methodPATCH) {
    const findSaleIndex = sales.findIndex((sale) => sale.id === Number(id));
    const { status } = JSON.parse(options.body);

    sales[findSaleIndex] = { ...sales[findSaleIndex], status };

    fs.writeFileSync(
      path.resolve(__dirname, '..', 'helpers', 'sales.json'),
      JSON.stringify(sales),
    );

    return Promise.resolve({
      json: () => Promise.resolve(sales[findSaleIndex]),
    });
  }
};

const mockFetchFailed = (url) => {
  if (url === loginURL) {
    return Promise.resolve({
      json: () => Promise.resolve({ message: 'Usuário não cadastrado' }),
    });
  }

  if (url === createUserURL) {
    return Promise.resolve({
      json: () => Promise.resolve({ message: 'O usuário já possui cadastro' }),
    });
  }
};

export default {
  mockFetchSuccess,
  mockFetchFailed,
};
