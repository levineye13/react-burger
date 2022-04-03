import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { useForm } from '../../hooks/useForm';
import { PAGES } from '../../utils/constants';
import { clearForm, register } from '../../services/actions';

function Register() {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { handleChange, handleSubmit, values } = useForm('register', register, {
    callback: () => dispatch(clearForm('register')),
  });

  if (isAuth) {
    return <Redirect to={state?.from || PAGES.root} />;
  }

  return (
    <AuthenticationSection title="Регистрация">
      <Form name="register" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          onChange={handleChange}
          value={values.name || ''}
        />
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
        <Button type="primary" htmlType="submit" size="medium">
          Зарегистрироваться
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?&ensp;<Link to={PAGES.login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
}

export default Register;
