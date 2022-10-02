import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../../App';
import dataMockFetch from '../mocks/dataMockFetch';
import dataMockLogin from '../mocks/dataMockLogin';
import * as dataTestId from '../helpers/dataTestId';
import * as routes from '../helpers/routes';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';
import sales from '../helpers/sales';

describe('Testes da página de Checkout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const sale = sales[0];

  it('Deve renderizar na rota "/customer/checkout"', async () => {
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

    sale.products.forEach((product) => {
      const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));

      userEvent.type(productInputQuantity, `${product.quantity}`);
    });
 
    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    
    userEvent.click(productCheckoutBtnCart);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerCheckout);
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

    sale.products.forEach((product) => {
      const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));

      userEvent.type(productInputQuantity, `${product.quantity}`);
    });
 
    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    
    userEvent.click(productCheckoutBtnCart);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerCheckout);
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

    sale.products.forEach((product) => {
      const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));

      userEvent.type(productInputQuantity, `${product.quantity}`);
    });
 
    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    
    userEvent.click(productCheckoutBtnCart);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerCheckout);
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

    sale.products.forEach((product) => {
      const productInputQuantity = screen.getByTestId(dataTestId.productInputQuantityById(product.id));

      userEvent.type(productInputQuantity, `${product.quantity}`);
    });
 
    const productCheckoutBtnCart = screen.getByTestId(dataTestId.productCheckoutBtnCart);
    
    userEvent.click(productCheckoutBtnCart);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerCheckout);
    });

    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);
    userEvent.click(navBarLogout);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.login);
    });
  });

  it('Deve renderizar os elementos de checkout corretos', async () => {
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

    sale.products.forEach((_product, index) => {
      const checkoutElementOrderTableItemNumber = screen
        .getByTestId(dataTestId.checkoutElementOrderTableItemNumber(index));
      const checkoutElementOrderTableName = screen
      .getByTestId(dataTestId.checkoutElementOrderTableName(index));
      const checkoutElementOrderTableQuantity = screen
      .getByTestId(dataTestId.checkoutElementOrderTableQuantity(index));
      const checkoutElementOrderTableUnityPrice = screen
      .getByTestId(dataTestId.checkoutElementOrderTableUnityPrice(index));
      const checkoutElementOrderTableSubTotal = screen
      .getByTestId(dataTestId.checkoutElementOrderTableSubTotal(index));
      const checkoutElementOrderTableRemove = screen
      .getByTestId(dataTestId.checkoutElementOrderTableRemove(index));

      expect(checkoutElementOrderTableItemNumber).toBeInTheDocument();
      expect(checkoutElementOrderTableName).toBeInTheDocument();
      expect(checkoutElementOrderTableQuantity).toBeInTheDocument();
      expect(checkoutElementOrderTableUnityPrice).toBeInTheDocument();
      expect(checkoutElementOrderTableSubTotal).toBeInTheDocument();
      expect(checkoutElementOrderTableRemove).toBeInTheDocument();
    });

    const checkoutElementOrderTotalPrice = screen
    .getByTestId(dataTestId.checkoutElementOrderTotalPrice);
    const checkoutSelectSeller = screen
    .getByTestId(dataTestId.checkoutSelectSeller);
    const checkoutInputAddress = screen
    .getByTestId(dataTestId.checkoutInputAddress);
    const checkoutInputAddressNumber = screen
    .getByTestId(dataTestId.checkoutInputAddressNumber);
    const checkoutBtnSubmitOrder = screen
    .getByTestId(dataTestId.checkoutBtnSubmitOrder);

    expect(checkoutElementOrderTotalPrice).toBeInTheDocument();
    expect(checkoutSelectSeller).toBeInTheDocument();
    expect(checkoutInputAddress).toBeInTheDocument();
    expect(checkoutInputAddressNumber).toBeInTheDocument();
    expect(checkoutBtnSubmitOrder).toBeInTheDocument();
  });

  it('Elementos da tabela de checkout devem possuir as informações corretas', async () => {
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

    sale.products.forEach((product, index) => {
      const checkoutElementOrderTableItemNumber = screen
        .getByTestId(dataTestId.checkoutElementOrderTableItemNumber(index));
      const checkoutElementOrderTableName = screen
        .getByTestId(dataTestId.checkoutElementOrderTableName(index));
      const checkoutElementOrderTableQuantity = screen
        .getByTestId(dataTestId.checkoutElementOrderTableQuantity(index));
      const checkoutElementOrderTableUnityPrice = screen
        .getByTestId(dataTestId.checkoutElementOrderTableUnityPrice(index));
      const checkoutElementOrderTableSubTotal = screen
        .getByTestId(dataTestId.checkoutElementOrderTableSubTotal(index));

      expect(checkoutElementOrderTableItemNumber)
        .toHaveTextContent((index + 1).toString());
      expect(checkoutElementOrderTableName)
        .toHaveTextContent(product.name);
      expect(checkoutElementOrderTableQuantity)
        .toHaveTextContent(product.quantity);
      expect(checkoutElementOrderTableUnityPrice)
        .toHaveTextContent(convertToBrazilianCurrency(product.price));
      expect(checkoutElementOrderTableSubTotal)
        .toHaveTextContent(convertToBrazilianCurrency(product.price * product.quantity));
    });
  });

  it('Deve ser possível remover um produto, de forma que ele não apareça mais na tabela de checkout', async () => {
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

    const firstSaleProduct = sale.products[0];

    const checkoutElementOrderTableName = screen
      .getByText(firstSaleProduct.name);

    expect(checkoutElementOrderTableName).toBeInTheDocument();

    const checkoutElementOrderTableRemove = screen
    .getByTestId(dataTestId.checkoutElementOrderTableRemove(0));
    userEvent.click(checkoutElementOrderTableRemove);

    const newCheckoutElementOrderTableName = screen
      .queryByText(firstSaleProduct.name);

    expect(newCheckoutElementOrderTableName).toBeNull();
  });

  it('Deve ser possível finalizar o pedido e ser redirecionado para a página de detalhes do pedido', async () => {
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

    const checkoutInputAddress = screen.getByTestId(dataTestId.checkoutInputAddress);
    const checkoutInputAddressNumber = screen.getByTestId(dataTestId.checkoutInputAddressNumber);
    const checkoutBtnSubmitOrder = screen.getByTestId(dataTestId.checkoutBtnSubmitOrder);

    userEvent.type(checkoutInputAddress, sale.deliveryAddress);
    userEvent.type(checkoutInputAddressNumber, sale.deliveryNumber);
    userEvent.click(checkoutBtnSubmitOrder);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(sale.id));
    });
  });
});
