import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Order from '../../components/order/order';
import { useDispatch, useSelector } from '../../hooks';
import { TOrderResponce, TFilterIngredients } from '../../utils/types';
import { IIngredient } from '../../utils/interfaces';
import {
  wsHistoryConnectionStart,
  wsHistoryConnectionClosed,
} from '../../services/actions/web-socket';

interface IProps {
  readonly titleStyles?: { [style: string]: string | number };
}

const OrderHistory: FC<IProps> = ({ titleStyles }): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { list: allOrders } = useSelector(
    (state) => state.webSocket.historyOrders
  );
  const { list } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(wsHistoryConnectionStart());

    return () => {
      dispatch(wsHistoryConnectionClosed());
    };
  }, [dispatch]);

  const order: TOrderResponce | undefined = allOrders.find(
    (order) => order.number === Number(id)
  );

  const filteredIngredients: TFilterIngredients = useMemo(() => {
    if (!order) {
      return { price: 0, filtered: [] };
    }

    return order.ingredients.reduce(
      (acc: TFilterIngredients, id: string) => {
        const ingredient: IIngredient | undefined = list.find(
          (ingredient) => ingredient._id === id
        );

        if (ingredient) {
          const index = acc.filtered.findIndex(
            (item) => item._id === ingredient._id
          );

          if (index === -1) {
            return {
              filtered: [...acc.filtered, { ...ingredient, qty: 1 }],
              price: acc.price + ingredient.price,
            };
          }

          (acc.filtered[index].qty as number)++;

          return {
            filtered: acc.filtered,
            price: acc.price + ingredient.price,
          };
        }

        return acc;
      },
      { price: 0, filtered: [] }
    );
  }, [list, order]);

  return (
    <section>
      {order && (
        <Order
          filtered={filteredIngredients.filtered}
          price={filteredIngredients.price}
          titleStyles={titleStyles}
          {...order}
        />
      )}
    </section>
  );
};

export default OrderHistory;
