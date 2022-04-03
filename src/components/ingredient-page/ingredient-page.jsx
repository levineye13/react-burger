import React from 'react';

import styles from './ingredient-page.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';

function IngredientPage() {
  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1>
      <IngredientDetails />
    </section>
  );
}

export default IngredientPage;
