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

describe('Testes da página de Detalhes do Pedido', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const firstSale = sales[0];
  const secondSale = sales[1];
  const thirdSale = sales[2];
  const fourthSale = sales[3];

  it('Deve renderizar na rota "/customer/orders/{id}"', async () => {
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

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(firstSale.id));
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

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(firstSale.id));
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

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(firstSale.id));
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(firstSale.id));
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

    const navBarCustomerOrdersAtCustomerPage = screen.getByTestId(
      dataTestId.navBarCustomerOrders);
    userEvent.click(navBarCustomerOrdersAtCustomerPage);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrders);
    });

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(firstSale.id));
    });

    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);
    userEvent.click(navBarLogout);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.login);
    });
  });

  it('Deve renderizar todos os elementos correspondentes aos detalhes do pedido', async () => {
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
        .getByTestId(dataTestId.ordersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(firstSale.id));
    });
    
    const orderDetailsLabelOrderId = await screen.findByTestId(dataTestId.orderDetailsLabelOrderId);
    const orderDetailsLabelSellerName = await screen.findByTestId(dataTestId.orderDetailsLabelSellerName);
    const orderDetailsLabelOrderDate = await screen.findByTestId(dataTestId.orderDetailsLabelOrderDate);
    const orderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryStatus);
    const orderDetailsLabelDeliveryCheck = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryCheck);
    
    expect(orderDetailsLabelOrderId).toBeInTheDocument();
    expect(orderDetailsLabelSellerName).toBeInTheDocument();
    expect(orderDetailsLabelOrderDate).toBeInTheDocument();
    expect(orderDetailsLabelDeliveryStatus).toBeInTheDocument();
    expect(orderDetailsLabelDeliveryCheck).toBeInTheDocument();

    firstSale.products.forEach((product, index) => {
      const orderDetailsOrderTableItemNumber = screen.getByTestId(dataTestId.orderDetailsOrderTableItemNumber(index));
      const orderDetailsOrderTableName = screen.getByTestId(dataTestId.orderDetailsOrderTableName(index));
      const orderDetailsOrderTableQuantity = screen.getByTestId(dataTestId.orderDetailsOrderTableQuantity(index));
      const orderDetailsOrderTableUnitPrice = screen.getByTestId(dataTestId.orderDetailsOrderTableUnitPrice(index));
      const orderDetailsOrderTableSubTotal = screen.getByTestId(dataTestId.orderDetailsOrderTableSubTotal(index));
      
      expect(orderDetailsOrderTableItemNumber).toBeInTheDocument();
      expect(orderDetailsOrderTableItemNumber).toHaveTextContent(index + 1);

      expect(orderDetailsOrderTableName).toBeInTheDocument();
      expect(orderDetailsOrderTableName).toHaveTextContent(product.name);

      expect(orderDetailsOrderTableQuantity).toBeInTheDocument();
      expect(orderDetailsOrderTableQuantity).toHaveTextContent(product.quantity.toString());

      expect(orderDetailsOrderTableUnitPrice).toBeInTheDocument();
      expect(orderDetailsOrderTableUnitPrice)
        .toHaveTextContent(convertToBrazilianCurrency(product.price));

      expect(orderDetailsOrderTableSubTotal).toBeInTheDocument();
      expect(orderDetailsOrderTableSubTotal)
        .toHaveTextContent(convertToBrazilianCurrency(product.price * product.quantity));
    });

    const orderDetailsOrderTotalPrice = screen.getByTestId(dataTestId.orderDetailsOrderTotalPrice);
    expect(orderDetailsOrderTotalPrice).toBeInTheDocument();
    expect(orderDetailsOrderTotalPrice)
      .toHaveTextContent(convertToBrazilianCurrency(firstSale.totalPrice));
  });

  it('Botão de marcar como entregue deve estar desabilitado quando o status do pedido for "Pendente"', async () => {
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
        .getByTestId(dataTestId.ordersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(firstSale.id));
    });
    
    const orderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryStatus);
    const orderDetailsLabelDeliveryCheck = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryCheck);
    
    expect(orderDetailsLabelDeliveryStatus).toHaveTextContent('Pendente');
    expect(orderDetailsLabelDeliveryCheck).toBeDisabled();
  });

  it('Botão de marcar como entregue deve estar desabilitado quando o status do pedido for "Pendente"', async () => {
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

    const ordersElementSecondOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(secondSale.id));
    userEvent.click(ordersElementSecondOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(secondSale.id));
    });
    
    const orderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryStatus);
    const orderDetailsLabelDeliveryCheck = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryCheck);
    
    expect(orderDetailsLabelDeliveryStatus).toHaveTextContent('Preparando');
    expect(orderDetailsLabelDeliveryCheck).toBeDisabled();
  });

  it('Botão de marcar como entregue deve permitir alterar status para "Entregue" quando o status do pedido for "Em Trânsito"', async () => {
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

    const ordersElementThirdOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(thirdSale.id));
    userEvent.click(ordersElementThirdOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(thirdSale.id));
    });
    
    const orderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryStatus);
    const orderDetailsLabelDeliveryCheck = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryCheck);
    
    expect(orderDetailsLabelDeliveryStatus).toHaveTextContent('Em Trânsito');
    expect(orderDetailsLabelDeliveryCheck).toBeEnabled();

    userEvent.click(orderDetailsLabelDeliveryCheck);
  });

  it('Botão de marcar como entregue deve estar desabilitado quando o status do pedido for "Entregue"', async () => {
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

    const ordersElementFourthOrderId = screen
        .getByTestId(dataTestId.ordersElementOrderId(fourthSale.id));
    userEvent.click(ordersElementFourthOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.customerOrdersById(fourthSale.id));
    });
    
    const orderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryStatus);
    const orderDetailsLabelDeliveryCheck = await screen.findByTestId(dataTestId.orderDetailsLabelDeliveryCheck);
    
    expect(orderDetailsLabelDeliveryStatus).toHaveTextContent('Entregue');
    expect(orderDetailsLabelDeliveryCheck).toBeDisabled();
  });
});
