import products from '../helpers/products';

const loginURL = 'http://localhost:3001/login';
const getAllProductsURL = 'http://localhost:3001/products';

const mockResponseSuccessLoginCustomer = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
};

const mockFetchSuccess = (url) => {
  if (url === loginURL) {
    return Promise.resolve({
      json: () => Promise.resolve(mockResponseSuccessLoginCustomer),
    });
  }
  if (url === getAllProductsURL) {
    return Promise.resolve({
      json: () => Promise.resolve(products),
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
