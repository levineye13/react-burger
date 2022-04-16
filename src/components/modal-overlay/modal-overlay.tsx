import React, { FC, ReactElement } from 'react';

import style from './modal-overlay.module.css';

interface IProps {
  readonly onClose: () => void;
}

const ModalOverlay: FC<IProps> = ({ onClose }): ReactElement => {
  return <div className={style.overlay} onClick={onClose} />;
};

export default ModalOverlay;
