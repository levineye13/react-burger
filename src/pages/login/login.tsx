import React, { FC, ReactElement } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Location } from 'history';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { useForm, useDispatch, useSelector } from '../../hooks';
import { Pages, Forms, Fields } from '../../utils/constants';
import { clearForm, login } from '../../services/actions';

type TFields = Fields.Email | Fields.Password;

const Login: FC = (): ReactElement => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { state } = useLocation<{ from: Location }>();
  const { handleChange, handleSubmit, values } = useForm<TFields>(
    Forms.Login,
    login,
    {
      callback: () => dispatch(clearForm(Forms.Login)),
    }
  );

  if (isAuth) {
    return <Redirect to={state?.from || Pages.Root} />;
  }

  return (
    <AuthenticationSection title="Вход">
      <Form name={Forms.Login} onSubmit={handleSubmit}>
        <Input
          type={Fields.Email}
          name={Fields.Email}
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email || ''}
        />
        <Input
          type={Fields.Password}
          name={Fields.Password}
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
