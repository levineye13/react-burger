import React, { FC, ReactElement } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Location } from 'history';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { useForm } from '../../hooks/useForm';
import { Pages } from '../../utils/constants';
import { clearForm, login } from '../../services/actions';

const Login: FC = (): ReactElement => {
  const { isAuth } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { state } = useLocation<{ from: Location }>();
  const { handleChange, handleSubmit, values } = useForm('login', login, {
    callback: () => dispatch(clearForm('login')),
  });

  if (isAuth) {
    return <Redirect to={state?.from || Pages.Root} />;
  }

  return (
    <AuthenticationSection title="Вход">
      <Form name="login" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email || ''}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon="ShowIcon"
          onChange={handleChange}
          value={values.password || ''}
        />

        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?&ensp;
        <Link to={Pages.Register}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?&ensp;
        <Link to={Pages.ForgotPassword}>Восстановить пароль</Link>
      </p>
    </AuthenticationSection>
  );
};

export default Login;
