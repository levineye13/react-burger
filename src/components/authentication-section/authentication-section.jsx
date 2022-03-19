import React from 'react';

function AuthenticationSection({ children, title }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default AuthenticationSection;
