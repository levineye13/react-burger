import { SET_FIELD_VALUE, CLEAR_FORM } from '../action-types';

export const setFieldValue = ({ formName, field, value }) => ({
  type: SET_FIELD_VALUE,
  payload: { formName, field, value },
});

export const clearForm = (formName) => ({
  type: CLEAR_FORM,
  payload: { formName },
});
