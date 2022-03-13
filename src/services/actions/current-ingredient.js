import { OPEN_INGREDIENT, CLOSE_INGREDIENT } from '../action-types';

export const openIngredient = (payload) => ({ type: OPEN_INGREDIENT, payload });

export const closeIngredient = () => ({ type: CLOSE_INGREDIENT });
