import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxx';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const closeSideDrawerHanlder = () => {
    setSideDrawerIsVisible(false);
  };

  const openSideDrawerHanlder = () => {
    setSideDrawerIsVisible(true);
  };

  return (
    <Aux>
      <SideDrawer
        isAuth={props.isAuthenticated}
        show={sideDrawerIsVisible}
        closed={closeSideDrawerHanlder}
      />
      <Toolbar
        isAuth={props.isAuthenticated}
        openMenu={openSideDrawerHanlder}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
