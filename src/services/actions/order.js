export const OPEN_ORDER = 'OPEN_ORDER';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const openOrder = (payload) => ({ type: OPEN_ORDER, payload });

export const closeOrder = () => ({ type: CLOSE_ORDER });
