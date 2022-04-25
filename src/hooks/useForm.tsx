import React, { ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreator } from 'redux';

import { setFieldValue } from '../services/actions';
import { TAppActions, TAppThunk, TFormField, TFormName } from '../utils/types';

const useForm = (
  formName: TFormName,
  submitAction: TAppThunk | ActionCreator<TAppActions>,
  options?: {
    callback?: () => void;
    initialValues?: TFormField;
  }
) => {
  const dispatch = useDispatch();
  const form = useSelector((state: any) => state.form[formName]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    dispatch(setFieldValue({ formName, field: name, value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (typeof submitAction === 'function') {
      dispatch(submitAction(form));
    }

    if (typeof options?.callback === 'function') {
      options.callback();
    }
  };

  const setInitialValues = () => {
    if (options?.initialValues) {
      for (const field in options.initialValues) {
        dispatch(
          setFieldValue({
            formName,
            field,
            value: options.initialValues[field as keyof TFormField],
          })
        );
      }
    }
  };

  return {
    values: form,
    handleChange,
    handleSubmit,
    setInitialValues,
  };
};

export { useForm };
