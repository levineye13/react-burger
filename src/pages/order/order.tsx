import React, { FC, ReactElement, useEffect, useMemo } from 'react';

import OrderComponent from '../../components/order/order';
import { useDispatch, useSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { TOrderResponce, TFilterIngredients } from '../../utils/types';
import { IIngredient } from '../../utils/interfaces';
import {
  wsFeedConnectionStart,
  wsFeedConnectionClosed,
} from '../../services/actions/web-socket';

interface IProps {
  titleStyles?: { [style: string]: string | number };
}

const Order: FC<IProps> = ({ titleStyles }): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { list: allOrders } = useSelector(
    (state) => state.webSocket.feedOrders
  );
  const { list } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(wsFeedConnectionStart());

    return () => {
      dispatch(wsFeedConnectionClosed());
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
          return {
            filtered: [...acc.filtered, ingredient],
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
        <OrderComponent
          filtered={filteredIngredients.filtered}
          price={filteredIngredients.price}
          titleStyles={titleStyles}
          {...order}
        />
      )}
    </section>
  );
};

export default Order;
