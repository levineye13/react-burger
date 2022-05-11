import React, { FC, ReactElement, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import styles from './profile.module.css';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import OrderListHistory from '../../components/order-list-history/order-list-history';
import ProfileForm from '../../components/profile-form/profile-form';
import { useDispatch } from '../../hooks';
import { Pages } from '../../utils/constants';
import { getUser } from '../../services/actions';

const Profile: FC = (): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <section className={`${styles.section} mt-30`}>
      <ProfileMenu />
      <Switch>
        <Route path={Pages.Profile} exact component={ProfileForm} />
        <Route path={Pages.Orders} component={OrderListHistory} />
      </Switch>
    </section>
  );
};

export default Profile;
