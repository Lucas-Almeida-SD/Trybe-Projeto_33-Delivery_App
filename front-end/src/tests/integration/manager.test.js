import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../../App';
import dataMockFetch from '../mocks/dataMockFetch';
import dataMockLogin from '../mocks/dataMockLogin';
import dataMockRegister from '../mocks/dataMockRegister';
import * as dataTestId from '../helpers/dataTestId';
import * as routes from '../helpers/routes';

describe('Testes da página do Administrador', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Deve renderizar na rota "/admin/manage"', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputAdmin.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputAdmin.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.adminManage);
    });
  });

  it('Deve renderizar os elementos de navegação', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputAdmin.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputAdmin.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.adminManage);
    });

    const navBarUserManagement = screen.getByTestId(dataTestId.navBarCustomerOrders);
    const navBarFullName = screen.getByTestId(dataTestId.navBarFullName);
    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);

    expect(navBarUserManagement).toBeInTheDocument();
    expect(navBarFullName).toBeInTheDocument();
    expect(navBarLogout).toBeInTheDocument();
  });

  it('Deve redirecionar para página de login ao fazer logout', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputAdmin.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputAdmin.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.adminManage);
    });

    const navBarLogout = screen.getByTestId(dataTestId.navBarLogout);

    userEvent.click(navBarLogout)

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.login);
    });
  });

  it('Deve renderizar todos os elementos de cadastro', async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputAdmin.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputAdmin.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.adminManage);
    });

    const adminManageInputName = screen.getByTestId(dataTestId.adminManageInputName);
    const adminManageInputEmail = screen.getByTestId(dataTestId.adminManageInputEmail);
    const adminManageInputPassword = screen.getByTestId(dataTestId.adminManageInputPassword);
    const adminManageSelectRole = screen.getByTestId(dataTestId.adminManageSelectRole);
    const adminManageButtonRegister = screen.getByTestId(dataTestId.adminManageButtonRegister);

    expect(adminManageInputName).toBeInTheDocument();
    expect(adminManageInputEmail).toBeInTheDocument();
    expect(adminManageInputPassword).toBeInTheDocument();
    expect(adminManageSelectRole).toBeInTheDocument();
    expect(adminManageButtonRegister).toBeInTheDocument();
  });

  it(`Botão de Cadastro deve estar desabilitado se o nome for 
  inválido`, async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputAdmin.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputAdmin.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.adminManage);
    });

    const adminInputName = screen.getByTestId(dataTestId.adminManageInputName);
    const adminInputEmail = screen.getByTestId(dataTestId.adminManageInputEmail);
    const adminInputPassword = screen.getByTestId(dataTestId.adminManageInputPassword);
    const buttonCreateRegister = screen.getByTestId(dataTestId.adminManageButtonRegister);

    userEvent.type(adminInputName, dataMockRegister.invalidInputRegister.name);
    userEvent.type(adminInputEmail, dataMockRegister.validInputRegister.email);
    userEvent.type(adminInputPassword, dataMockRegister.validInputRegister.password);

    expect(buttonCreateRegister).toBeDisabled();
  });

  it(`Botão de Cadatro deve estar desabilitado se o formato de email for
  inválido`, async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputAdmin.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputAdmin.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.adminManage);
    });

    const adminInputName = screen.getByTestId(dataTestId.adminManageInputName);
    const adminInputEmail = screen.getByTestId(dataTestId.adminManageInputEmail);
    const adminInputPassword = screen.getByTestId(dataTestId.adminManageInputPassword);
    const buttonCreateRegister = screen.getByTestId(dataTestId.adminManageButtonRegister);

    userEvent.type(adminInputName, dataMockRegister.validInputRegister.name);
    userEvent.type(adminInputEmail, dataMockRegister.invalidInputRegister.email);
    userEvent.type(adminInputPassword, dataMockRegister.validInputRegister.password);

    expect(buttonCreateRegister).toBeDisabled();
  });

  it(`Botão de Cadatro deve estar desabilitado se o password for
  inválido`, async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestId.inputEmailLogin);
    const inputPassword = screen.getByTestId(dataTestId.inputPasswordLogin);
    const buttonLogin = screen.getByTestId(dataTestId.buttonLogin);

    userEvent.type(inputEmail, dataMockLogin.validLoginInputAdmin.email);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputAdmin.password);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe(routes.adminManage);
    });

    const adminInputName = screen.getByTestId(dataTestId.adminManageInputName);
    const adminInputEmail = screen.getByTestId(dataTestId.adminManageInputEmail);
    const adminInputPassword = screen.getByTestId(dataTestId.adminManageInputPassword);
    const buttonCreateRegister = screen.getByTestId(dataTestId.adminManageButtonRegister);

    userEvent.type(adminInputName, dataMockRegister.validInputRegister.name);
    userEvent.type(adminInputEmail, dataMockRegister.validInputRegister.email);
    userEvent.type(adminInputPassword, dataMockRegister.invalidInputRegister.password);

    expect(buttonCreateRegister).toBeDisabled();
  });
});