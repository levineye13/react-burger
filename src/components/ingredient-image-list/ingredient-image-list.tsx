import React, { FC, ReactElement } from 'react';

import styles from './ingredient-image-list.module.css';
import { IIngredient } from '../../utils/interfaces';

interface IProps {
  ingredients: ReadonlyArray<IIngredient>;
  numberToDisplay: number;
}

const IngredientImageList: FC<IProps> = ({
  ingredients,
  numberToDisplay,
}): ReactElement => {
  const numberToRestIngredients: number = ingredients.length - numberToDisplay;
  const nextIngredient: IIngredient | undefined = ingredients[numberToDisplay];

  return (
    <ul className={styles.list}>
      {ingredients.slice(0, numberToDisplay).map((item, index) => (
        <li
          className={styles.item}
          key={item.uuid}
          style={{ zIndex: numberToDisplay - index }}
        >
          <img className={styles.img} src={item.image} alt={item.name} />
        </li>
      ))}

      {numberToRestIngredients > 0 && nextIngredient !== undefined && (
        <li
          className={`${styles.item} ${styles.item__last}`}
          style={{ zIndex: 0 }}
        >
          <span
            className={`${styles.remainder} text text_type_main-default`}
            style={{ zIndex: numberToDisplay }}
          >
            +{numberToRestIngredients}
          </span>
          <img
            className={styles.img}
            src={nextIngredient.image}
            alt={nextIngredient.name}
          />
        </li>
      )}
    </ul>
  );
};

export default IngredientImageList;
