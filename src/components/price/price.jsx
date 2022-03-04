import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

function Price({
  price,
  type = 'default',
  iconType = 'default',
  externalGeometry = '',
}) {
  const modifier = `number_${type}`;

  return (
    <div className={`${styles.price} ${styles[iconType]} ${externalGeometry}`}>
      <span className={`${styles.number} ${styles[modifier]} mr-2`}>
        {price}
      </span>
      <CurrencyIcon type="primary" />
    </div>
  );
}

Price.propTypes = {
  price: PropTypes.number.isRequired,
  type: PropTypes.string,
  iconType: PropTypes.string,
  externalGeometry: PropTypes.string,
};

export default Price;
