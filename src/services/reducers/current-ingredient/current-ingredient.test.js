import {
  currentIngredientReducer,
  initialCurrentIngredient,
} from './current-ingredient';
import { SET_INGREDIENT } from '../../action-types/current-ingredient';
import { setIngredient } from '../../actions/current-ingredient';

const ingredient = {
  _id: '4352345',
  name: 'name',
  image: 'path',
  price: 432,
  type: 'bun',
  calories: 544,
  proteins: 456,
  fat: 463,
  carbohydrates: 563,
};

describe('current ingredient reducer', () => {
  it('should return initial state', () => {
    expect(currentIngredientReducer(undefined, {})).toEqual(
      initialCurrentIngredient
    );
  });

  it(`should return ${SET_INGREDIENT}`, () => {
    expect(
      currentIngredientReducer(
        initialCurrentIngredient,
        setIngredient(ingredient)
      )
    ).toEqual(ingredient);
  });
});
