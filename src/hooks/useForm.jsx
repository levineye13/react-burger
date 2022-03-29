import { useSelector, useDispatch } from 'react-redux';

import { setFieldValue } from '../services/actions';

function useForm(formName, submitAction, { callback } = {}) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form[formName]);

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    dispatch(setFieldValue({ formName, field: name, value }));
  }

  function handleSubmit() {
    if (typeof submitAction === 'function') {
      dispatch(submitAction(form));
    }

    if (typeof callback === 'function') {
      callback();
    }
  }

  return {
    values: form,
    handleChange,
    handleSubmit,
  };
}

export { useForm };
