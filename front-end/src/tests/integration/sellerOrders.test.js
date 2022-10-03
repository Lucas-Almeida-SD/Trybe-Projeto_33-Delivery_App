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

describe('Testes da página de Vendas do Vendedor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const sale = sales[0];

  it('Deve renderizar na rota "/seller/orders"', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputSeller.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputSeller.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrders);
    });
  });

  it('Deve renderizar os elementos de navegação', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputSeller.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputSeller.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrders);
    });

    const navBarSellerOrders = screen.getByTestId(dataTestId.navBarCustomerOrders);
    const navBarFullName = screen.getByTestId(dataTestId.navBarFullName);
    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);

    expect(navBarSellerOrders).toBeInTheDocument();
    expect(navBarFullName).toBeInTheDocument();
    expect(navBarLogout).toBeInTheDocument();
  });

  it('Deve redirecionar para página de vendas do dendedor ao clicar no link de navegação correspondente', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputSeller.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputSeller.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrders);
    });

    const navBarSellerOrders = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarSellerOrders);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrders);
    });
  });

  it('Deve redirecionar para página de login ao fazer logout', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputSeller.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputSeller.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrders);
    });

    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);
    userEvent.click(navBarLogout);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.login);
    });
  });

  it('Deve renderizar os elementos dos cards das vendas com as informações corretas', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputSeller.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputSeller.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrders);
    });

    sales.forEach((sale) => {
      const ordersElementOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(sale.id));
      const ordersElementDeliveryStatus = screen
        .getByTestId(dataTestId.sellerOrdersElementDeliveryStatus(sale.id));
      const ordersElementOrderDate = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderDate(sale.id));
      const ordersElementCardPrice = screen
        .getByTestId(dataTestId.sellerOrdersElementCardPrice(sale.id));
        const ordersElementCardAddress = screen
        .getByTestId(dataTestId.sellerOrdersElementCardAddress(sale.id));

      expect(ordersElementOrderId).toBeInTheDocument();
      expect(ordersElementDeliveryStatus).toBeInTheDocument();
      expect(ordersElementOrderDate).toBeInTheDocument();
      expect(ordersElementCardPrice).toBeInTheDocument();
      expect(ordersElementCardAddress).toBeInTheDocument();

      expect(ordersElementOrderId).toHaveTextContent(sale.id);
      expect(ordersElementDeliveryStatus).toHaveTextContent(sale.status);
      expect(ordersElementOrderDate).toHaveTextContent(convertDate(sale.saleDate));
      expect(ordersElementCardPrice).toHaveTextContent(convertToBrazilianCurrency(sale.totalPrice));
    });
  });

  it('Deve redirecionar para página de detalhes da venda ao clicar em alguma venda', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputSeller.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputSeller.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrders);
    });

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(sale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(sale.id));
    });
  });
});
