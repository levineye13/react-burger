import { combineReducers } from 'redux';

import { userReducer } from './user/user';
import { ingredientsReducer } from './burger-ingredients/burger-ingredients';
import { burgerConstructorReducer } from './constructor-ingredients/constructor-ingredients';
import { currentIngredientReducer } from './current-ingredient/current-ingredient';
import { orderReducer } from './order/order';
import { formReducer } from './form/form';
import { webSocketReducer } from './web-socket/web-socket';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  form: formReducer,
  webSocket: webSocketReducer,
});
