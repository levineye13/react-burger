import { orderReducer, initialOrder } from './order';
import { OPEN_ORDER, CLOSE_ORDER, SET_ORDER } from '../../action-types/order';
import { openOrder, closeOrder, setOrder } from '../../actions/order';

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      isOpen: false,
      order: initialOrder.order,
    });
  });

  it(`should handle ${OPEN_ORDER}`, () => {
    expect(orderReducer(initialOrder, openOrder())).toEqual({
      ...initialOrder,
      isOpen: true,
    });
  });

  it(`should handle ${CLOSE_ORDER}`, () => {
    expect(orderReducer(initialOrder, closeOrder())).toEqual({
      ...initialOrder,
      isOpen: false,
    });
  });

  it(`should handle ${SET_ORDER}`, () => {
    expect(
      orderReducer(initialOrder, setOrder({ name: 'order name', number: 1 }))
    ).toEqual({
      ...initialOrder,
      order: { name: 'order name', number: 1 },
      isOpen: false,
    });
  });
});
