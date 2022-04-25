import React, { FC, ReactElement, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import style from './ingredient-details.module.css';
import { IIngredient } from '../../utils/interfaces';
import { useSelector } from '../../hooks/useSelector';

const IngredientDetails: FC = (): ReactElement | null => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useSelector((state) => state);

  const currentIngredient = useMemo(
    () => ingredients.list.find((item: IIngredient) => item._id === id),
    [id, ingredients]
  );

  if (!currentIngredient) {
    return null;
  }

  return (
    <article className={style.article}>
      <figure className={style.description}>
        <img
          className={style.img}
          src={currentIngredient.image}
          alt={currentIngredient.name}
        />
        <figcaption className={`${style.name} text text_type_main-medium mt-4`}>
          {currentIngredient.name}
        </figcaption>
      </figure>
      <ul className={`${style.list} mt-8`}>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {currentIngredient.calories}
          </p>
        </li>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Белки, г
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {currentIngredient.proteins}
          </p>
        </li>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Жиры, г
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {currentIngredient.fat}
          </p>
        </li>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {currentIngredient.carbohydrates}
          </p>
        </li>
      </ul>
    </article>
  );
};

export default IngredientDetails;
