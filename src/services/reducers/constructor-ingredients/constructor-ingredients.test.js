import {
  burgerConstructorReducer,
  initialSelectedIngredients,
} from './constructor-ingredients';
import * as types from '../../action-types/constructor-ingredients';
import * as actions from '../../actions/constructor-ingredients';

const ingredients = [
  {
    _id: '4352345',
    name: 'name bun',
    image: 'path1',
    price: 432,
    type: 'bun',
    calories: 544,
    proteins: 456,
    fat: 463,
    carbohydrates: 563,
  },
  {
    _id: '78564754',
    name: 'name sauce',
    image: 'path2',
    price: 4656,
    type: 'sauce',
    calories: 54564,
    proteins: 456,
    fat: 6756,
    carbohydrates: 5445,
  },
  {
    _id: '5643563454',
    name: 'name main',
    image: 'path3',
    price: 545667,
    type: 'main',
    calories: 657,
    proteins: 456,
    fat: 456,
    carbohydrates: 676,
  },
];

describe('constructor ingredients reducer', () => {
  it('should return initial state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(
      initialSelectedIngredients
    );
  });

  it(`should return ${types.SET_CURRENT_BUN}`, () => {
    expect(
      burgerConstructorReducer(
        initialSelectedIngredients,
        actions.setCurrentBun(ingredients[0])
      )
    ).toEqual({ ...initialSelectedIngredients, bun: ingredients[0] });
  });

  it(`should return ${types.SET_SELECTED_INGREDIENTS}`, () => {
    expect(
      burgerConstructorReducer(
        initialSelectedIngredients,
        actions.setSelectedIngredients(ingredients)
      )
    ).toEqual({ ...initialSelectedIngredients, ingredients: ingredients });
  });

  it(`should return ${types.ADD_INGREDIENT} type sauce`, () => {
    const action = actions.addIngredient(ingredients[1]);

    expect(
      burgerConstructorReducer(initialSelectedIngredients, action)
    ).toEqual({
      ...initialSelectedIngredients,
      ingredients: [action.payload],
    });
  });

  it(`should return ${types.ADD_INGREDIENT} type bun`, () => {
    const action = actions.addIngredient(ingredients[0]);

    expect(
      burgerConstructorReducer(initialSelectedIngredients, action)
    ).toEqual({
      ingredients: [],
      bun: action.payload,
    });
  });

  it(`should return ${types.DELETE_INGREDIENT} type main`, () => {
    expect(
      burgerConstructorReducer(
        {
          bun: ingredients[0],
          ingredients: [ingredients[1], ingredients[2]],
        },
        actions.deleteIngredient(ingredients[2]._id)
      )
    ).toEqual({ bun: ingredients[0], ingredients: [ingredients[1]] });
  });
});
