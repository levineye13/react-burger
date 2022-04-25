import React, { FC, ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';

import { useSelector } from '../hooks/useSelector';
import { Pages } from '../utils/constants';

const ProtectedRoute: FC<RouteProps> = ({
  children,
  ...props
}): ReactElement => {
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
              pathname: Pages.Login,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
