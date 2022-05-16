import { formReducer, initialForm } from './form';
import { SET_FIELD_VALUE, CLEAR_FORM } from '../../action-types/form';
import { setFieldValue, clearForm } from '../../actions/form';

describe('form reducer', () => {
  it(`should handle initial state`, () => {
    expect(formReducer(undefined, {})).toEqual(initialForm);
  });

  it(`should handle ${SET_FIELD_VALUE} with empty forms`, () => {
    expect(
      formReducer(
        initialForm,
        setFieldValue({ formName: 'login', field: 'name', value: 'UserName' })
      )
    ).toEqual({ ...initialForm, login: { name: 'UserName' } });
  });

  it(`should handle ${SET_FIELD_VALUE}`, () => {
    expect(
      formReducer(
        { ...initialForm, login: { name: 'UserName' } },
        setFieldValue({
          formName: 'register',
          field: 'email',
          value: 'UserName@email.com',
        })
      )
    ).toEqual({
      ...initialForm,
      login: { name: 'UserName' },
      register: { email: 'UserName@email.com' },
    });
  });

  it(`should handle ${CLEAR_FORM}`, () => {
    expect(
      formReducer(
        { ...initialForm, login: { name: 'UserName' } },
        clearForm('login')
      )
    ).toEqual(initialForm);
  });
});
