import { IIngredient } from '../../../utils/interfaces';
import { SET_INGREDIENT } from '../../action-types';
import { TCurrentIngredient } from '../../actions/current-ingredient';

type CurrentIngredientState = IIngredient | null;

export const initialCurrentIngredient: CurrentIngredientState = null;

export const currentIngredientReducer = (
  state = initialCurrentIngredient,
  action: TCurrentIngredient
): CurrentIngredientState => {
  switch (action.type) {
    case SET_INGREDIENT:
      return { ...action.payload };

    default:
      return state;
  }
};
