import { useSelector, useDispatch } from 'react-redux';

import { setFieldValue, clearForm } from '../services/actions';

function useForm(
  formName,
  submitAction,
  { callback, initialValues = {} } = {}
) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form[formName]);

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    dispatch(setFieldValue({ formName, field: name, value }));
  }

  function handleSubmit() {
    if (typeof submitAction === 'function') {
      dispatch(submitAction(form));
      dispatch(clearForm(formName));
    }

    if (typeof callback === 'function') {
      callback();
    }
  }

  function setInitialValues() {
    for (const field in initialValues) {
      dispatch(setFieldValue({ formName, field, value: initialValues[field] }));
    }
  }

  return {
    values: form,
    handleChange,
    handleSubmit,
    setInitialValues,
  };
}

export { useForm };
