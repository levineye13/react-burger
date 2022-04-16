import React, { FC, ReactElement } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

interface IProps {
  readonly price: number;
  readonly type?: string;
  readonly iconType?: string;
  readonly externalGeometry?: string;
}

const Price: FC<IProps> = ({
  price,
  type = 'default',
  iconType = 'default',
  externalGeometry = '',
}): ReactElement => {
  const modifier: string = `number_${type}`;

  return (
    <div className={`${styles.price} ${styles[iconType]} ${externalGeometry}`}>
      <span className={`${styles.number} ${styles[modifier]} mr-2`}>
        {price}
      </span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default Price;
