import React from 'react';

import styles from './authentication-section.module.css';

function AuthenticationSection({ children, title }) {
  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default AuthenticationSection;
