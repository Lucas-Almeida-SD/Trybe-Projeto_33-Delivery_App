import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../../App';
import dataMockLogin from '../mocks/dataMockLogin';
import mockFetch from '../mocks/dataMockFetch';

describe('Testes da página de Login', () => {
  const dataTestInputEmail = 'common_login__input-email';
  const dataTestInputPassword = 'common_login__input-password';
  const dataTestButtonLogin = 'common_login__button-login';
  const dataTestButtonRegister = 'common_login__button-register';
  const dataTestInvalidEmail = 'common_login__element-invalid-email';

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('Deve renderizar na rota "/login"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/login');
  });
    
  it('Deve possuir um elemento input para o email', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestInputEmail);

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute('type', 'email');
  });

  it('Deve possuir um elemento input para o password', () => {
    renderWithRouter(<App />);

    const inputPassword = screen.getByTestId(dataTestInputPassword);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute('type', 'password');
  });

  it('Deve possuir um elemento button para botão de login', () => {
    renderWithRouter(<App />);

    const buttonLogin = screen.getByTestId(dataTestButtonLogin);

    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toHaveAttribute('type', 'submit');
  });

  it('Deve possuir um elemento button para botão de login', () => {
    renderWithRouter(<App />);

    const buttonRegister = screen.getByTestId(dataTestButtonRegister);

    expect(buttonRegister).toBeInTheDocument();
    expect(buttonRegister).toHaveAttribute('type', 'button');
  });

  it('Botão de login deve estar desabilitado se o formato de email for inválido', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestInputEmail);
    userEvent.type(inputEmail, dataMockLogin.invalidLoginInput.email);

    const buttonLogin = screen.getByTestId(dataTestButtonLogin);
    expect(buttonLogin).toBeDisabled();
  });

  it('Botão de login deve estar desabilitado se o password for inválido', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(dataTestInputEmail);
    userEvent.type(inputEmail, dataMockLogin.invalidLoginInput.password);

    const buttonLogin = screen.getByTestId(dataTestButtonLogin);
    expect(buttonLogin).toBeDisabled();
  });

  it('Redireciona o usuário (consumidor) para tela de produtos se as credenciais forem válidas', async () => {
    
    const { history } = renderWithRouter(<App />);
    global.fetch = jest.fn(mockFetch.mockFetchSuccess);

    const inputEmail = screen.getByTestId(dataTestInputEmail);
    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);

    const inputPassword = screen.getByTestId(dataTestInputPassword);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);

    const buttonLogin = screen.getByTestId(dataTestButtonLogin);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(buttonLogin).not.toBeInTheDocument();
    });

    expect(history.location.pathname).toBe('/customer/products');
  });

  it('Exibe mensagem de erro se o usuário não for cadastrado', async () => {
    renderWithRouter(<App />);
    global.fetch = jest.fn(mockFetch.mockFetchFailed);

    const inputEmail = screen.getByTestId(dataTestInputEmail);
    userEvent.type(inputEmail, dataMockLogin.validLoginInputCustomer.email);

    const inputPassword = screen.getByTestId(dataTestInputPassword);
    userEvent.type(inputPassword, dataMockLogin.validLoginInputCustomer.password);

    const buttonLogin = screen.getByTestId(dataTestButtonLogin);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      const notification = screen.getByTestId(dataTestInvalidEmail);
      expect(notification).toBeInTheDocument();
    })
  });

  it('Ao clicar no botão de fazer registro, redireciona para tela de registro', () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegister = screen.getByTestId(dataTestButtonRegister);

    userEvent.click(buttonRegister);

    expect(history.location.pathname).toBe('/register');
  });
});