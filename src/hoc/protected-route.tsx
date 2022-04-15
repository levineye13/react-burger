import React, { FC, ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PAGES } from '../utils/constants';

const { login } = PAGES;

interface IProps {
  [prop: string]: any;
}

const ProtectedRoute: FC<IProps> = ({ children, ...props }): ReactElement => {
  const { isAuth } = useSelector((state: any) => state.user);

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
};

export default ProtectedRoute;
