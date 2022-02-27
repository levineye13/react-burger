import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './modal.module.css';
import { modalContainer } from '../../utils/constants';

function Modal({ children, isOpen, onClose, title }) {
  return createPortal(
    <dialog
      className={`${style.modal} ${
        isOpen ? style.modal_active : ''
      } pt-10 pl-10 pr-10 p-15`}
    >
      <header className={style.header}>
        <h1 className="text text_type_main-large">{title}</h1>
        <button className={style.button} type="button">
          <CloseIcon type="primary" onClick={onClose} />
        </button>
      </header>
      {children}
    </dialog>,
    modalContainer
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
