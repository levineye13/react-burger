import { SET_FIELD_VALUE, CLEAR_FORM } from '../../action-types';
import { TForm } from '../../actions/form';
import { TFormName } from '../../../utils/types';

type TFormState = {
  [formName in TFormName]: { [field: string]: string };
};

export const initialForm: TFormState = {
  login: {},
  register: {},
  forgotPassword: {},
  resetPassword: {},
  profile: {},
};

export const formReducer = (state = initialForm, action: TForm): TFormState => {
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
        [action.payload.formName]: {},
      };

    default:
      return state;
  }
};
