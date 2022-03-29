import React from 'react';
import PropTypes from 'prop-types';

import styles from './form.module.css';

function Form({ children, name, onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form
      action="#"
      name={name}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <fieldset className={styles.fieldset}>{children}</fieldset>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
