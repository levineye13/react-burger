import React, { FC, ReactElement, useCallback } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Location } from 'history';

import AuthenticationSection from '../../components/authentication-section/authentication-section';
import Form from '../../components/form/form';
import { useForm, useDispatch, useSelector } from '../../hooks';
import { Pages, Forms, Fields } from '../../utils/constants';
import { clearForm, restorePassword } from '../../services/actions';

const ForgotPassword: FC = (): ReactElement => {
  const { isAuth, request, failed } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { location, replace } = useHistory<{ from: Location }>();

  const onSubmit = useCallback(() => {
    dispatch(clearForm(Forms.ForgotPassword));

    if (!request && !failed) {
      replace({
        pathname: Pages.ResetPassword,
        state: { from: location },
      });
    }
  }, [request, failed, location, replace, dispatch]);

  const { handleChange, handleSubmit, values } = useForm<Fields.Email>(
    Forms.ForgotPassword,
    restorePassword,
    {
      callback: onSubmit,
    }
  );

  if (isAuth) {
    return <Redirect to={location.state?.from || Pages.Root} />;
  }

  return (
    <AuthenticationSection title="Восстановление пароля">
      <Form name={Forms.ForgotPassword} onSubmit={handleSubmit}>
        <Input
          type={Fields.Email}
          name={Fields.Email}
          placeholder="Укажите e-mail"
          onChange={handleChange}
          value={values.email || ''}
        />
        <Button type="primary" htmlType="submit" size="medium">
          Восстановить
        </Button>
      </Form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?&ensp;<Link to={Pages.Login}>Войти</Link>
      </p>
    </AuthenticationSection>
  );
};

export default ForgotPassword;
