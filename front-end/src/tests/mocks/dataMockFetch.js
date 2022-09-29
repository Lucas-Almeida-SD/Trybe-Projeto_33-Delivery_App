import products from '../helpers/products';
import sales from '../helpers/sales';
import users from '../helpers/users';

const loginURL = 'http://localhost:3001/login';
const getAllProductsURL = 'http://localhost:3001/products';
const getAllSalesByCustomer = 'http://localhost:3001/sales';
const createUser = 'http://localhost:3001/user';
const getAllSalesBySeller = 'http://localhost:3001/sales/seller';

const mockFetchSuccess = (url, options) => {
  if (url === loginURL) {
    const findUser = users.find((user) => user.email === JSON.parse(options.body).email);
    return Promise.resolve({
      json: () => Promise.resolve(findUser),
    });
  }

  if (url === getAllProductsURL) {
    return Promise.resolve({
      json: () => Promise.resolve(products),
    });
  }

  if (url === getAllSalesByCustomer) {
    return Promise.resolve({
      json: () => Promise.resolve(sales),
    });
  }

  if (url === createUser) {
    return Promise.resolve({
      json: () => Promise.resolve(users[2]),
    });
  }

  if (url === getAllSalesBySeller) {
    return Promise.resolve({
      json: () => Promise.resolve(sales),
    });
  }
};

const mockFetchFailed = (url) => {
  if (url === loginURL) {
    return Promise.resolve({
      json: () => Promise.resolve({ message: 'Usuário não cadastrado' }),
    });
  }
};

export default {
  mockFetchSuccess,
  mockFetchFailed,
};
