import React, { useEffect, FC, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalContainer, ESC_KEY } from '../../utils/constants';

interface IProps {
  readonly onClose: () => void;
  readonly title?: string;
}

const Modal: FC<IProps> = ({ children, onClose, title = '' }): ReactElement => {
  useEffect(() => {
    const handleClickEsc = (e: KeyboardEvent): void => {
      if (e.key === ESC_KEY) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleClickEsc);

    return () => document.removeEventListener('keydown', handleClickEsc);
  }, [onClose]);

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
};

export default Modal;
