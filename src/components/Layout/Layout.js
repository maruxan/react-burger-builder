import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxx';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHanlder = () => {
    this.setState({ showSideDrawer: false });
  };

  openSideDrawerHanlder = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Aux>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          closed={this.closeSideDrawerHanlder}
        />
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openMenu={this.openSideDrawerHanlder}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
