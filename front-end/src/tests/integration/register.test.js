import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';
import dataMockFetch from '../mocks/dataMockFetch';
import dataMockRegister from '../mocks/dataMockRegister';

describe('Testes da tela de Registro', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const dataTestButtonRegisterLogin = 'common_login__button-register';
  const dataTestInputNameRegister = 'common_register__input-name';
  const dataTestInputEmailRegister = 'common_register__input-email';
  const dataTestInputPasswordRegister = 'common_register__input-password';
  const dataTestButtonCreateRegister = 'common_register__button-register';

  it('Deve renderizar na rota "/register', () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegister = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegister);

    expect(history.location.pathname).toBe('/register');
  });

  it('Deve possuir os elementos necessários para um novo registro, ', () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegisterLogin);

    expect(history.location.pathname).toBe('/register');

    const inputName = screen.getByTestId(dataTestInputNameRegister);
    const inputEmail = screen.getByTestId(dataTestInputEmailRegister);
    const inputPassword = screen.getByTestId(dataTestInputPasswordRegister);
    const buttonCreateRegister = screen.getByTestId(dataTestButtonCreateRegister);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonCreateRegister).toBeInTheDocument();
  });

  it(`Ao realizar o cadastro, deve redirecionar o usuário para a tela de 
  produtos`, async () => {
    global.fetch = jest.fn(dataMockFetch.mockFetchSuccess);

    const { history } = renderWithRouter(<App />);

    const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegisterLogin);

    expect(history.location.pathname).toBe('/register');

    const inputName = screen.getByTestId(dataTestInputNameRegister);
    const inputEmail = screen.getByTestId(dataTestInputEmailRegister);
    const inputPassword = screen.getByTestId(dataTestInputPasswordRegister);
    const buttonCreateRegister = screen.getByTestId(dataTestButtonCreateRegister);

    userEvent.type(inputName, dataMockRegister.validInputRegister.name);
    userEvent.type(inputEmail, dataMockRegister.validInputRegister.email);
    userEvent.type(inputPassword, dataMockRegister.validInputRegister.password);

    expect(buttonCreateRegister).toBeEnabled();
    userEvent.click(buttonCreateRegister);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });
  });

  it(`Botão de Cadastro deve estar desabilitado se o nome for 
  inválido`, () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegisterLogin);

    expect(history.location.pathname).toBe('/register');

    const inputName = screen.getByTestId(dataTestInputNameRegister);
    const inputEmail = screen.getByTestId(dataTestInputEmailRegister);
    const inputPassword = screen.getByTestId(dataTestInputPasswordRegister);
    const buttonCreateRegister = screen.getByTestId(dataTestButtonCreateRegister);

    userEvent.type(inputName, dataMockRegister.invalidInputRegister.name);
    userEvent.type(inputEmail, dataMockRegister.validInputRegister.email);
    userEvent.type(inputPassword, dataMockRegister.validInputRegister.password);

    expect(buttonCreateRegister).toBeDisabled();
  });

  it(`Botão de Cadatro deve estar desabilitado se o formato de email for
  inválido`, () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegisterLogin);

    expect(history.location.pathname).toBe('/register');

    const inputName = screen.getByTestId(dataTestInputNameRegister);
    const inputEmail = screen.getByTestId(dataTestInputEmailRegister);
    const inputPassword = screen.getByTestId(dataTestInputPasswordRegister);
    const buttonCreateRegister = screen.getByTestId(dataTestButtonCreateRegister);

    userEvent.type(inputName, dataMockRegister.validInputRegister.name);
    userEvent.type(inputEmail, dataMockRegister.invalidInputRegister.email);
    userEvent.type(inputPassword, dataMockRegister.validInputRegister.password);

    expect(buttonCreateRegister).toBeDisabled();
  });

  it(`Botão de Cadatro deve estar desabilitado se o password for
  inválido`, () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegisterLogin);

    expect(history.location.pathname).toBe('/register');

    const inputName = screen.getByTestId(dataTestInputNameRegister);
    const inputEmail = screen.getByTestId(dataTestInputEmailRegister);
    const inputPassword = screen.getByTestId(dataTestInputPasswordRegister);
    const buttonCreateRegister = screen.getByTestId(dataTestButtonCreateRegister);

    userEvent.type(inputName, dataMockRegister.validInputRegister.name);
    userEvent.type(inputEmail, dataMockRegister.validInputRegister.email);
    userEvent.type(inputPassword, dataMockRegister.invalidInputRegister.password);

    expect(buttonCreateRegister).toBeDisabled();
  });
});
