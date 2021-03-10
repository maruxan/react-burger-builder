import React, { Component } from 'react';

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
          show={this.state.showSideDrawer}
          closed={this.closeSideDrawerHanlder}
        />
        <Toolbar openMenu={this.openSideDrawerHanlder} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
