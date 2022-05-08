import { combineReducers } from 'redux';

import { userReducer } from './user';
import { ingredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './constructor-ingredients';
import { currentIngredientReducer } from './current-ingredient';
import { orderReducer } from './order';
import { formReducer } from './form';
import { webSocketReducer } from './web-socket';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  form: formReducer,
  webSocket: webSocketReducer,
});
