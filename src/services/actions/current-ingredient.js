export const OPEN_INGREDIENT = 'OPEN_INGREDIENT';
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT';

export const openIngredient = (payload) => ({ type: OPEN_INGREDIENT, payload });

export const closeIngredient = () => ({ type: CLOSE_INGREDIENT });
