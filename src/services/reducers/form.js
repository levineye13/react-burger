import { SET_FIELD_VALUE, CLEAR_FORM } from '../action-types';

const initialForm = {
  login: {},
  register: {},
  forgotPassword: {},
  resetPassword: {},
  profile: {},
};

export const formReducer = (state = initialForm, action) => {
  switch (action.type) {
    case SET_FIELD_VALUE: {
      const { formName, field, value } = action.payload;

      return {
        ...state,
        [formName]: {
          ...state[formName],
          [field]: value,
        },
      };
    }

    case CLEAR_FORM:
      return {
        ...state,
        [action.payload.formName]: initialForm.login,
      };

    default:
      return state;
  }
};
