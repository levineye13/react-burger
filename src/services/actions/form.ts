import { TFormName } from '../../utils/types';
import { SET_FIELD_VALUE, CLEAR_FORM } from '../action-types';

// ======= Actions =======

export interface ISetFieldValue {
  readonly type: typeof SET_FIELD_VALUE;
  readonly payload: {
    formName: TFormName;
    field: string;
    value: string | number;
  };
}

export interface IClearForm {
  readonly type: typeof CLEAR_FORM;
  readonly payload: { formName: string };
}

export type TForm = ISetFieldValue | IClearForm;

// ======= Action Creators =======

export const setFieldValue = (payload: {
  formName: TFormName;
  field: string;
  value: string | number;
}): ISetFieldValue => ({
  type: SET_FIELD_VALUE,
  payload,
});

export const clearForm = (formName: TFormName): IClearForm => ({
  type: CLEAR_FORM,
  payload: { formName },
});
