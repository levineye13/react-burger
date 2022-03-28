import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';

function ModalRoute({ children, path, title = '', exact = false }) {
  const history = useHistory();

  function returnFromModal() {
    history.goBack();
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => (
        <Modal
          onClose={returnFromModal}
          title={title}
          overlay={location.state?.isModal}
        >
          {children}
        </Modal>
      )}
    />
  );
}

ModalRoute.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default ModalRoute;
