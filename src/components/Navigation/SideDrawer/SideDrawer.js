import React from 'react';

import classes from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxx';

const sideDrawer = (props) => {
  let attachedClases = [classes.SideDrawer, classes.Close];

  if (props.show) {
    attachedClases = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClases.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
