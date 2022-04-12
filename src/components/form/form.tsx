import React, { FC, FormEvent, ReactElement } from 'react';

import styles from './form.module.css';

interface IProps {
  readonly name: string;
  readonly onSubmit: () => void;
}

const Form: FC<IProps> = ({ children, name, onSubmit }): ReactElement => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
  };

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
};

export default Form;
