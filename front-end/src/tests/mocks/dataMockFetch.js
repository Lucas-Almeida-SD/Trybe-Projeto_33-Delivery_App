import products from '../helpers/products';
import sales from '../helpers/sales';
import users from '../helpers/users';

const loginURL = 'http://localhost:3001/login';
const getAllProductsURL = 'http://localhost:3001/products';
const getAllSales = 'http://localhost:3001/sales';

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

  if (url === getAllSales) {
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
