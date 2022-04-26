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
import { clearForm, register } from '../../services/actions';

type TFields = Fields.Name | Fields.Email | Fields.Password;

const Register: FC = (): ReactElement => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { state } = useLocation<{ from: Location }>();

  const { handleChange, handleSubmit, values } = useForm<TFields>(
    Forms.Register,
    register,
    {
      callback: () => dispatch(clearForm(Forms.Register)),
    }
  );

  if (isAuth) {
    return <Redirect to={state?.from || Pages.Root} />;
  }

  return (
    <AuthenticationSection title="Регистрация">
      <Form name={Forms.Register} onSubmit={handleSubmit}>
        <Input
          type="text"
          name={Fields.Name}
          placeholder="Имя"
          onChange={handleChange}
          value={values.name || ''}
        />
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
        <Button type="primary" htmlType="submit" size="medium">
          Зарегистрироваться
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?&ensp;<Link to={Pages.Login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
};

export default Register;
