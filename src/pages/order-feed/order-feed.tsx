import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Order from '../../components/order/order';
import { useDispatch, useSelector } from '../../hooks';
import { TFilterIngredients } from '../../utils/types';
import { IIngredient } from '../../utils/interfaces';
import { clearOrder, getOrder } from '../../services/actions';

interface IProps {
  readonly titleStyles?: { [style: string]: string | number };
}

const OrderFeed: FC<IProps> = ({ titleStyles }): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { list } = useSelector((state) => state.ingredients);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(id));

    return () => {
      dispatch(clearOrder());
    };
  }, [id, dispatch]);

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
      <Order
        filtered={filteredIngredients.filtered}
        price={filteredIngredients.price}
        titleStyles={titleStyles}
        {...order}
      />
    </section>
  );
};

export default OrderFeed;
