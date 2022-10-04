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
import salesExample from '../helpers/sales.example.json';
import fs from 'fs';
import path from 'path';

describe('Testes da página de Detalhes do Pedido', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'helpers', 'sales.json'),
      JSON.stringify(salesExample),
    );
  })

  const firstSale = sales[0];
  const secondSale = sales[1];
  const thirdSale = sales[2];
  const fourthSale = sales[3];

  it('Deve renderizar na rota "/seller/orders/{id}"', async () => {
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
        .getByTestId(dataTestId.sellerOrdersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(firstSale.id));
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

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(firstSale.id));
    });

    const navBarSellerOrders = screen.getByTestId(dataTestId.navBarCustomerOrders);
    const navBarFullName = screen.getByTestId(dataTestId.navBarFullName);
    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);

    expect(navBarSellerOrders).toBeInTheDocument();
    expect(navBarFullName).toBeInTheDocument();
    expect(navBarLogout).toBeInTheDocument();
  });

  it('Deve redirecionar para página de vendas ao clicar no link de navegação correspondente', async () => {
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
        .getByTestId(dataTestId.sellerOrdersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(firstSale.id));
    });

    const navBarsellerOrders = screen.getByTestId(dataTestId.navBarCustomerOrders);
    userEvent.click(navBarsellerOrders);

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

    const ordersElementFirstOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(firstSale.id));
    });

    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);
    userEvent.click(navBarLogout);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.login);
    });
  });

  it('Deve renderizar todos os elementos correspondentes aos detalhes da venda', async () => {
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
        .getByTestId(dataTestId.sellerOrdersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(firstSale.id));
    });
    
    const orderDetailsLabelOrderId = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelOrderId);
    const orderDetailsLabelOrderDate = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelOrderDate);
    const orderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const orderDetailsLabelPreparingCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    const orderDetailsLabelDispatchCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    
    expect(orderDetailsLabelOrderId).toBeInTheDocument();
    expect(orderDetailsLabelOrderDate).toBeInTheDocument();
    expect(orderDetailsLabelDeliveryStatus).toBeInTheDocument();
    expect(orderDetailsLabelPreparingCheck).toBeInTheDocument();
    expect(orderDetailsLabelDispatchCheck).toBeInTheDocument();

    firstSale.products.forEach((product, index) => {
      const sellerOrderDetailsTableItemNumber = screen.getByTestId(dataTestId.sellerOrderDetailsTableItemNumber(index));
      const sellerOrderDetailsTableName = screen.getByTestId(dataTestId.sellerOrderDetailsTableName(index));
      const sellerOrderDetailsTableQuantity = screen.getByTestId(dataTestId.sellerOrderDetailsTableQuantity(index));
      const sellerOrderDetailsTableUnitPrice = screen.getByTestId(dataTestId.sellerOrderDetailsTableUnitPrice(index));
      const sellerOrderDetailsOrderTableSubTotal = screen.getByTestId(dataTestId.sellerOrderDetailsOrderTableSubTotal(index));
      
      expect(sellerOrderDetailsTableItemNumber).toBeInTheDocument();
      expect(sellerOrderDetailsTableItemNumber).toHaveTextContent(index + 1);

      expect(sellerOrderDetailsTableName).toBeInTheDocument();
      expect(sellerOrderDetailsTableName).toHaveTextContent(product.name);

      expect(sellerOrderDetailsTableQuantity).toBeInTheDocument();
      expect(sellerOrderDetailsTableQuantity).toHaveTextContent(product.quantity.toString());

      expect(sellerOrderDetailsTableUnitPrice).toBeInTheDocument();
      expect(sellerOrderDetailsTableUnitPrice)
        .toHaveTextContent(convertToBrazilianCurrency(product.price));

      expect(sellerOrderDetailsOrderTableSubTotal).toBeInTheDocument();
      expect(sellerOrderDetailsOrderTableSubTotal)
        .toHaveTextContent(convertToBrazilianCurrency(product.price * product.quantity));
    });

    const sellerOrderDetailsTotalPrice = screen.getByTestId(dataTestId.sellerOrderDetailsTotalPrice);
    expect(sellerOrderDetailsTotalPrice).toBeInTheDocument();
    expect(sellerOrderDetailsTotalPrice)
      .toHaveTextContent(convertToBrazilianCurrency(firstSale.totalPrice));
  });


  it('Botão "Preparar Pedido" deve permitir alterar status para "Preparando" quando o status do pedido for "Pendente"', async () => {
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

    const ordersElementThirdOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(firstSale.id));
    userEvent.click(ordersElementThirdOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(firstSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelPreparingCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelPreparingCheck);
    
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Pendente');
    expect(sellerOrderDetailsLabelPreparingCheck).toBeEnabled();

    userEvent.click(sellerOrderDetailsLabelPreparingCheck);

    await waitFor(() => {
      expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Preparando');
    });

  });

  it('Botão "Preparar Pedido" deve estar desabilitado quando o status da venda for "Preparando"', async () => {
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
        .getByTestId(dataTestId.sellerOrdersElementOrderId(secondSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(secondSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelPreparingCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelPreparingCheck);
    
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Preparando');
    expect(sellerOrderDetailsLabelPreparingCheck).toBeDisabled();
  });

  it('Botão "Preparar Pedido" deve estar desabilitado quando o status da venda for "Em Trânsito"', async () => {
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


    const ordersElementSecondOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(thirdSale.id));
    userEvent.click(ordersElementSecondOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(thirdSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelPreparingCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Em Trânsito');
    expect(sellerOrderDetailsLabelPreparingCheck).toBeDisabled();
  });

  it('Botão "Preparar Pedido" deve estar desabilitado quando o status do pedido for "Entregue"', async () => {
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

    const ordersElementFourthOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(fourthSale.id));
    userEvent.click(ordersElementFourthOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(fourthSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelPreparingCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Entregue');
    expect(sellerOrderDetailsLabelPreparingCheck).toBeDisabled();
  });

  it('Botão "Saiu para Entrega" deve permitir alterar status para "Em Trânsito" quando o status do pedido for "Preparando"', async () => {
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

    const ordersElementThirdOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(secondSale.id));
    userEvent.click(ordersElementThirdOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(secondSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelDispatchCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Preparando');
    expect(sellerOrderDetailsLabelDispatchCheck).toBeEnabled();

    userEvent.click(sellerOrderDetailsLabelDispatchCheck);

    await waitFor(() => {
      expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Em Trânsito');
    });

  });

  it('Botão "Saiu para Entrega" deve estar desabilitado quando o status da venda for "Pendente"', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);
    const { history } = renderWithRouter(<App />);

    fs.writeFileSync(
      path.resolve(__dirname, '..', 'helpers', 'sales.json'),
      JSON.stringify(salesExample),
    );

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
        .getByTestId(dataTestId.sellerOrdersElementOrderId(firstSale.id));
    userEvent.click(ordersElementFirstOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(firstSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelDispatchCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Pendente');
    expect(sellerOrderDetailsLabelDispatchCheck).toBeDisabled();
  });

  it('Botão "Saiu para Entrega" deve estar desabilitado quando o status da venda for "Em Trânsito"', async () => {
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


    const ordersElementSecondOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(thirdSale.id));
    userEvent.click(ordersElementSecondOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(thirdSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelDispatchCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Em Trânsito');
    expect(sellerOrderDetailsLabelDispatchCheck).toBeDisabled();
  });

  it('Botão "Saiu para Entrega" deve estar desabilitado quando o status do pedido for "Entregue"', async () => {
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

    const ordersElementFourthOrderId = screen
        .getByTestId(dataTestId.sellerOrdersElementOrderId(fourthSale.id));
    userEvent.click(ordersElementFourthOrderId);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.sellerOrdersById(fourthSale.id));
    });
    
    const sellerOrderDetailsLabelDeliveryStatus = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDeliveryStatus);
    const sellerOrderDetailsLabelDispatchCheck = await screen.findByTestId(dataTestId.sellerOrderDetailsLabelDispatchCheck);
    
    expect(sellerOrderDetailsLabelDeliveryStatus).toHaveTextContent('Entregue');
    expect(sellerOrderDetailsLabelDispatchCheck).toBeDisabled();
  });
});
