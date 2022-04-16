import React, { FC, ReactElement } from 'react';

import styles from './authentication-section.module.css';

interface IProps {
  readonly title: string;
}

const AuthenticationSection: FC<IProps> = ({
  children,
  title,
}): ReactElement => {
  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      {children}
    </section>
  );
};

export default AuthenticationSection;
