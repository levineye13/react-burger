import { OPEN_ORDER, CLOSE_ORDER } from '../action-types';

export const openOrder = (payload) => ({ type: OPEN_ORDER, payload });

export const closeOrder = () => ({ type: CLOSE_ORDER });
