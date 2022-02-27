import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css';
import { modalContainer } from '../../utils/constants';

function ModalOverlay({ isOpen, onClose }) {
  return createPortal(
    <div
      className={`${style.overlay} ${isOpen ? style.overlay_active : ''}`}
      onClick={onClose}
    />,
    modalContainer
  );
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
