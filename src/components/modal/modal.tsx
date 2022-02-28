import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalContainer, ESC_CODE } from '../../utils/constants';

function Modal({ children, onClose, title }) {
  useEffect(() => {
    function handleClickEsc(e) {
      if (e.keyCode === ESC_CODE) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleClickEsc);

    return () => document.removeEventListener('keydown', handleClickEsc);
  }, []);

  return createPortal(
    <>
      <dialog className={`${style.modal} pt-10 pl-10 pr-10 p-15`}>
        <div className={style.wrapper}>
          <h1 className="text text_type_main-large">{title}</h1>
          <button className={style.button} type="button">
            <CloseIcon type="primary" onClick={onClose} />
          </button>
        </div>
        {children}
      </dialog>
      <ModalOverlay onClose={onClose} />
    </>,
    modalContainer
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
