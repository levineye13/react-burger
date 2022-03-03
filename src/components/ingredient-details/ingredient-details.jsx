import React from 'react';
import PropTypes from 'prop-types';

import style from './ingredient-details.module.css';

function IngredientDetails({
  image,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) {
  return (
    <article className={style.article}>
      <figure className={style.description}>
        <img className={style.img} src={image} alt={name} />
        <figcaption className={`${style.name} text text_type_main-medium mt-4`}>
          {name}
        </figcaption>
      </figure>
      <ul className={`${style.list} mt-8`}>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {calories}
          </p>
        </li>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Белки, г
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {proteins}
          </p>
        </li>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Жиры, г
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {fat}
          </p>
        </li>
        <li className={style.item}>
          <h2 className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </h2>
          <p className="text text_type_digits-default text_color_inactive mt-2">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </article>
  );
}

IngredientDetails.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
};

export default IngredientDetails;
