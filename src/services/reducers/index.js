import { combineReducers } from 'redux';

import { ingredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './constructor-ingredients';
import { currentIngredientReducer } from './current-ingredient';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});
