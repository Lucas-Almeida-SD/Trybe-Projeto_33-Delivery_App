import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Notification from '../components/Notification';
import requestLogin from '../services/requestLogin';
import * as formValidate from '../validations/formValidate';
import * as routes from '../helpers/routes';
import userRoutes from '../helpers/userRoutes';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import setToLocalStorage from '../helpers/setToLocalStorage';
import logo from '../images/images.jpeg';
import MyContext from '../contexts/MyContext';

export default function Login() {
  const history = useHistory();
  const { setIsFetching } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormFieldsValid, setIsFormFieldsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');

    const validateFields = formValidate.validateEmail(email)
      && formValidate.validatePassword(password);

    setIsFormFieldsValid(validateFields);
  }, [email, password]);

  useEffect(() => {
    if (history.location.pathname === routes.home) history.push(routes.login);

    if (getFromLocalStorage('user')) {
      history.push(routes.customerProducts);
    }
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsFetching(true);
    const user = await requestLogin(email, password);
    setIsFetching(false);

    if (!user.message) {
      setToLocalStorage('user', user);
      return history.push(userRoutes[user.role]);
    }

    setErrorMessage(user.message);
  };

  return (
    <main>
      <form
        onSubmit={ handleSubmit }
      >
        <div>
          <img src={ logo } alt="Logo da aolicação" />
          <h1>Delivery App</h1>
        </div>
        <div className="flex flex-col gap-6">
          <Input
            data-testid="common_login__input-email"
            placeholder="Email"
            type="email"
            id="userEmail"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
          <Input
            data-testid="common_login__input-password"
            placeholder="Type your password"
            type="password"
            id="pass"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </div>
        <div>
          <button
            data-testid="common_login__button-login"
            type="submit"
            disabled={ !isFormFieldsValid }
          >
            LOGIN
          </button>
          <button
            data-testid="common_login__button-register"
            type="button"
            onClick={ () => { history.push('/register'); } }
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
      {(errorMessage) && (
        <Notification
          message={ errorMessage }
          dataTestId="common_login__element-invalid-email"
        />
      )}
    </main>
  );
}
