import React from 'react';

import classes from './MenuButton.module.css';

const menuButton = (props) => (
  <div className={classes.MenuButton} onClick={props.clicked}>
    <div className={classes.Bar}></div>
  </div>
);

export default menuButton;
