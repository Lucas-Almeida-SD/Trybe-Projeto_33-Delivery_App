import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../../App';
import dataMockFetch from '../mocks/dataMockFetch';
import dataMockLogin from '../mocks/dataMockLogin';
import * as dataTestId from '../helpers/dataTestId';
import * as routes from '../helpers/routes';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';
import sales from '../helpers/sales.json';
import convertDate from '../helpers/convertDate';

describe('Testes da página de Pedidos do Consumidor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const sale = sales[0];

  it('Deve renderizar na rota "/customer/orders"', async () => {
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });

    const navBarCustomerProducts = screen.getByTestId(dataTestId.navBarCustomerProducts);
    userEvent.click(navBarCustomerProducts);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerProducts);
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });

    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);
    userEvent.click(navBarLogout);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.login);
    });
  });

  it('Deve renderizar os elementos dos cards dos pedidos corretamente', async () => {
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });

    sales.forEach((sale) => {
      const ordersElementOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(sale.id));
      const ordersElementDeliveryStatus = screen
        .getByTestId(dataTestId.ordersElementDeliveryStatus(sale.id));
      const ordersElementOrderDate = screen
        .getByTestId(dataTestId.ordersElementOrderDate(sale.id));
      const ordersElementCardPrice = screen
        .getByTestId(dataTestId.ordersElementCardPrice(sale.id));

      expect(ordersElementOrderId).toBeInTheDocument();
      expect(ordersElementDeliveryStatus).toBeInTheDocument();
      expect(ordersElementOrderDate).toBeInTheDocument();
      expect(ordersElementCardPrice).toBeInTheDocument();
    });
  });

  it('Elementos dos cards dos pedidos devem possuir as informações corretas', async () => {
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });

    sales.forEach((sale) => {
      const ordersElementOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(sale.id));
      const ordersElementDeliveryStatus = screen
        .getByTestId(dataTestId.ordersElementDeliveryStatus(sale.id));
      const ordersElementOrderDate = screen
        .getByTestId(dataTestId.ordersElementOrderDate(sale.id));
      const ordersElementCardPrice = screen
        .getByTestId(dataTestId.ordersElementCardPrice(sale.id));

      expect(ordersElementOrderId).toHaveTextContent(sale.id);
      expect(ordersElementDeliveryStatus).toHaveTextContent(sale.status);
      expect(ordersElementOrderDate).toHaveTextContent(convertDate(sale.saleDate));
      expect(ordersElementCardPrice).toHaveTextContent(convertToBrazilianCurrency(sale.totalPrice));
    });
  });

  it('Deve redirecionar para página de detalhes do pedido ao clicar em algum pedido', async () => {
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(sale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(sale.id));
    });
  });
});
