import React from 'react';

function Form({ children, name, onSubmit }) {
  return (
    <form action="#" name={name} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
