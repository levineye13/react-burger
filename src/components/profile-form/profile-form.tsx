import React, { FC, ReactElement, useEffect } from 'react';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-form.module.css';
import Form from '../../components/form/form';
import { Forms, Fields } from '../../utils/constants';
import { useForm, useDispatch, useSelector } from '../../hooks';
import { setFieldValue, updateUser } from '../../services/actions';

type TFields = Fields.Name | Fields.Email | Fields.Password;

const ProfileForm: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.user);

  const { values, handleChange, handleSubmit, setInitialValues } =
    useForm<TFields>(Forms.Profile, updateUser, {
      initialValues: {
        name,
        email,
        password: '',
      },
      callback: () =>
        dispatch(
          setFieldValue({
            formName: Forms.Profile,
            field: Fields.Password,
            value: '',
          })
        ),
    });

  useEffect(() => {
    setInitialValues();
  }, [name, email]);

  const isInputsChanged = (): boolean => {
    if (
      (name !== values.name && values.name !== undefined) ||
      (email !== values.email && values.email !== undefined) ||
      values.password
    ) {
      return true;
    }

    return false;
  };

  return (
    <Form name={Forms.Profile} onSubmit={handleSubmit}>
      <Input
        type="text"
        name={Fields.Name}
        placeholder="Имя"
        icon="EditIcon"
        onChange={handleChange}
        value={values.name || ''}
      />
      <Input
        type={Fields.Email}
        name={Fields.Email}
        placeholder="Логин"
        icon="EditIcon"
        onChange={handleChange}
        value={values.email || ''}
      />
      <Input
        type={Fields.Password}
        name={Fields.Password}
        placeholder="Пароль"
        icon="EditIcon"
        onChange={handleChange}
        value={values.password || ''}
      />
      <div
        className={`${styles.buttons} ${
          isInputsChanged() ? styles.buttons_visible : ''
        }`}
      >
        <Button
          type="secondary"
          size="medium"
          htmlType="button"
          onClick={setInitialValues}
        >
          Отмена
        </Button>
        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
