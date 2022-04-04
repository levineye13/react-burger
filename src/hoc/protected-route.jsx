import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PAGES } from '../utils/constants';

const { login } = PAGES;

function ProtectedRoute({ children, ...props }) {
  const { isAuth } = useSelector((state) => state.user);

  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
