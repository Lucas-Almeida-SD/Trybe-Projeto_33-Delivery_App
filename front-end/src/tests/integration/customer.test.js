import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../../App';
import dataMockFetch from '../mocks/dataMockFetch';
import dataMockLogin from '../mocks/dataMockLogin';
import * as dataTestId from '../helpers/dataTestId';
import * as routes from '../helpers/routes';
import products from '../helpers/products';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';
import sales from '../helpers/sales';

describe('Testes da página do Consumidor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const sale = sales[0];
  const number0String = '0';

  it('Deve renderizar na rota "/costumer/products"', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });
  });

  it('Deve renderizar os elementos de navegação', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const navBarCustomerProducts = screen.getByTestId(dataTestId.navBarCustomerProducts);
    const navBarCustomerOrders = screen.getByTestId(dataTestId.navBarCustomerOrders);
    const navBarFullName = screen.getByTestId(dataTestId.navBarFullName);
    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);

    expect(navBarCustomerProducts).toBeInTheDocument();
    expect(navBarCustomerOrders).toBeInTheDocument();
    expect(navBarFullName).toBeInTheDocument();
    expect(navBarLogout).toBeInTheDocument();
  });

  it('Deve redirecionar para página de produtos do consumidor ao clicar no link de navegação correspondente', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const navBarCustomerProducts = screen.getByTestId(dataTestId.navBarCustomerProducts);
    userEvent.click(navBarCustomerProducts);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });
  });

  it('Deve redirecionar para página de pedidos do consumidor ao clicar no link de navegação correspondente', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const navBarCustomerOrders = screen.getByTestId(dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrders);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });
  });

  it('Deve redirecionar para página de login ao fazer logout', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);
    userEvent.click(navBarLogout);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.login);
    });
  });

  it('Deve renderizar os cards de produtos com os elementos corretos', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    products.forEach((product) => {
      const productPrice = screen.getByTestId(dataTestId.productPriceById(product.id));
      expect(productPrice).toBeInTheDocument();
      expect(productPrice).toHaveTextContent(convertToBrazilianCurrency(product.price));

      const productImg = screen.getByTestId(dataTestId.productImgById(product.id));
      expect(productImg).toBeInTheDocument();

      const productName = screen.getByTestId(dataTestId.productNameById(product.id));
      expect(productImg).toBeInTheDocument();
      expect(productName).toHaveTextContent(product.name);

      const productRemoveBtn = screen.getByTestId(dataTestId.productRemoveBtnById(product.id));
      expect(productRemoveBtn).toBeInTheDocument();

      const productAddBtn = screen.getByTestId(dataTestId.productAddBtnById(product.id));
      expect(productAddBtn).toBeInTheDocument();

      const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));
      expect(productInputQuantity).toBeInTheDocument();
      expect(productInputQuantity).toHaveValue(number0String);
    });

    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    const productCheckoutBtnValue = screen.getByTestId(dataTestId.productCheckoutBtnValue);

    expect(productCheckoutBtnCart).toBeInTheDocument();
    expect(productCheckoutBtnValue).toBeInTheDocument();
  });

  it('Botão de adicionar produto deve realzar incremento na quantidade do produto de forma correta', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const product = sales[0].products[0];
    
    const productAddBtn = screen.getByTestId(dataTestId.productAddBtnById(product.id));
    for (let index = 0; index < product.quantity; index += 1) {
      userEvent.click(productAddBtn);
    }

    const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));
    expect(productInputQuantity).toHaveValue(product.quantity.toString());
  });

  it('Botão de remover produto deve realzar decremento na quantidade do produto de forma correta', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const product = sales[0].products[0];
    
    const productAddBtn = screen.getByTestId(dataTestId.productAddBtnById(product.id));
    const productRemoveBtn = screen.getByTestId(dataTestId.productRemoveBtnById(product.id));
    for (let index = 0; index < product.quantity; index += 1) {
      userEvent.click(productAddBtn);
      userEvent.click(productRemoveBtn);
    }

    const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));
    expect(productInputQuantity).toHaveValue(number0String);
  });

  it('Input da quantidade de produto deve permitir inserir apenas valores numéricos positivos', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const product = sales[0].products[0];

    const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));
    const productRemoveBtn = screen.getByTestId(dataTestId.productRemoveBtnById(product.id));

    const validValues = [1, 5, 10, 100];
    const invalidValues = [' ', 'string'];
  
    validValues.forEach((value) => {
      userEvent.clear(productInputQuantity);
      userEvent.type(productInputQuantity, value.toString());
      expect(productInputQuantity).toHaveValue(value.toString());
    });

    invalidValues.forEach((value) => {
      userEvent.clear(productInputQuantity);
      userEvent.type(productInputQuantity, value.toString());
      expect(productInputQuantity).toHaveValue(number0String);
    });

    userEvent.click(productRemoveBtn);
    expect(productInputQuantity).toHaveValue(number0String)
  });

  it('Botão do "carrinho" deve estar desabilitado se nenhum produto for adicionado', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    expect(productCheckoutBtnCart).toBeDisabled();
  });

  it('Valor total de produtos deve estar correto ao adicionar produtos ao carrinho / Botão de "carrinho" deve estar habilitado', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    sale.products.forEach((product) => {
      const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));

      userEvent.type(productInputQuantity, `${product.quantity}`);
    });
 
    const productCheckoutBtnValue = screen.getByTestId(dataTestId.productCheckoutBtnValue);
    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    
    const totalPrice = convertToBrazilianCurrency(sale.totalPrice);
    expect(productCheckoutBtnValue).toHaveTextContent(totalPrice);
    expect(productCheckoutBtnCart).toBeEnabled();
  });

  it('Botão de "carrinho" deve redirecionar para página de checkout', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
    });

    sale.products.forEach((product) => {
      const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));

      userEvent.type(productInputQuantity, `${product.quantity}`);
    });
 
    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    
    userEvent.click(productCheckoutBtnCart);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerCheckout);
    });
  });
});
