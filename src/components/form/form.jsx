import React from 'react';

import styles from './form.module.css';

function Form({ children, name, onSubmit }) {
  return (
    <form action="#" name={name} onSubmit={onSubmit} className={styles.form}>
      <fieldset className={styles.fieldset}>{children}</fieldset>
    </form>
  );
}

export default Form;
