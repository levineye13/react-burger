import React, { ChangeEvent, FormEvent } from 'react';
import { ActionCreator } from 'redux';

import { useDispatch, useSelector } from './';
import { setFieldValue } from '../services/actions';
import { TAppActions, TAppThunk, TFormName } from '../utils/types';

const useForm = <T extends string>(
  formName: TFormName,
  submitAction: TAppThunk | ActionCreator<TAppActions>,
  options?: {
    callback?: () => void;
    initialValues?: { [key in T]: string };
  }
): {
  values: { [key in T]: string };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setInitialValues: () => void;
} => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form[formName]);

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

  const setInitialValues = (): void => {
    if (options?.initialValues) {
      for (const field in options.initialValues) {
        dispatch(
          setFieldValue({
            formName,
            field,
            value: options.initialValues[field],
          })
        );
      }
    }
  };

  return {
    values: form as { [key in T]: string },
    handleChange,
    handleSubmit,
    setInitialValues,
  };
};

export { useForm };
