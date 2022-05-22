import { ingredientsReducer, initialIngredients } from './burger-ingredients';
import * as types from '../../action-types/burger-ingredients';

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

const sortedIngredients = {
  bun: [
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
  ],
  sauce: [
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
  ],
  main: [
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
  ],
};

describe('burger ingredients reduces', () => {
  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialIngredients);
  });

  it(`should return ${types.SET_INGREDIENTS}`, () => {
    expect(
      ingredientsReducer(initialIngredients, {
        type: types.SET_INGREDIENTS,
        payload: ingredients,
      })
    ).toEqual({ ...initialIngredients, list: ingredients });
  });

  it(`should return ${types.SET_SORTED_INGREDIENTS}`, () => {
    expect(
      ingredientsReducer(initialIngredients, {
        type: types.SET_SORTED_INGREDIENTS,
        payload: sortedIngredients,
      })
    ).toEqual({ ...initialIngredients, sortedIngredients: sortedIngredients });
  });

  it(`should return ${types.INCREMENT}`, () => {
    expect(
      ingredientsReducer(initialIngredients, {
        type: types.INCREMENT,
        payload: ingredients[0],
      })
    ).toEqual({
      ...initialIngredients,
      ingredientsCount: {
        bun: { [ingredients[0]._id]: 1 },
      },
    });

    expect(
      ingredientsReducer(
        {
          ...initialIngredients,
          ingredientsCount: {
            bun: { [ingredients[0]._id]: 1 },
            [ingredients[1]._id]: 2,
          },
        },
        {
          type: types.INCREMENT,
          payload: ingredients[1],
        }
      )
    ).toEqual({
      ...initialIngredients,
      ingredientsCount: {
        bun: { [ingredients[0]._id]: 1 },
        [ingredients[1]._id]: 3,
      },
    });
  });

  it(`should return ${types.DECREMENT}`, () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredients,
          ingredientsCount: {
            bun: { [ingredients[0]._id]: 1 },
            [ingredients[1]._id]: 1,
          },
        },
        {
          type: types.DECREMENT,
          payload: ingredients[1],
        }
      )
    ).toEqual({
      ...initialIngredients,
      ingredientsCount: {
        bun: { [ingredients[0]._id]: 1 },
      },
    });
  });

  it(`should create ${types.CLEAR_COUNTERS}`, () => {
    expect(
      ingredientsReducer(
        {
          ...initialIngredients,
          ingredientsCount: {
            bun: { [ingredients[0]._id]: 1 },
            [ingredients[1]._id]: 3,
            [ingredients[2]._id]: 5,
          },
        },
        {
          type: types.CLEAR_COUNTERS,
        }
      )
    ).toEqual(initialIngredients);
  });
});
