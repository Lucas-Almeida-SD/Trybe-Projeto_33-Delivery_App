import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes da tela de Registro', () => {
  const dataTestButtonRegisterLogin = 'common_login__button-register';
  const dataTestInputNameRegister = 'common_register__input-name';
  const dataTestInputEmailRegister = 'common_register__input-email';
  const dataTestInputPasswordRegister = 'common_register__input-password';
  const dataTestButtonCreateRegister = 'common_register__button-register';

  it('Deve renderizar na rota "/register', async () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegister = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegister);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/register');
    });
  });

  it('Deve possuir os elementos necessários para um novo registro, ', async () => {
    const { history } = renderWithRouter(<App />);

    const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegisterLogin);
    userEvent.click(buttonRegisterLogin);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/register');
    });

    const inputName = screen.getByTestId(dataTestInputNameRegister);
    const inputEmail = screen.getByTestId(dataTestInputEmailRegister);
    const inputPassword = screen.getByTestId(dataTestInputPasswordRegister);
    const buttonCreateRegister = screen.getByTestId(dataTestButtonCreateRegister);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonCreateRegister).toBeInTheDocument();
  });

  // it('Deve possuir os elementos necessários para um novo registro, ', async () => {
  //   const { history } = renderWithRouter(<App />);

  //   const buttonRegisterLogin = screen.getByTestId(dataTestButtonRegisterLogin);
  //   userEvent.click(buttonRegisterLogin);

  //   await waitFor(() => {
  //     expect(history.location.pathname).toBe('/register');
  //   });

  //   const inputName = screen.getByTestId(dataTestInputNameRegister);
  //   const inputEmail = screen.getByTestId(dataTestInputNameRegister);
  //   const inputPassword = screen.getByTestId(dataTestInputNameRegister);
  //   const buttonCreateRegister = screen.getByTestId(dataTestInputNameRegister);

  //   expect(inputName).toBeInTheDocument();
  //   expect(inputEmail).toBeInTheDocument();
  //   expect(inputPassword).toBeInTheDocument();
  //   expect(buttonCreateRegister).toBeInTheDocument();
  // });
});
