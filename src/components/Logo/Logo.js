import React from 'react';
// makes webpack aware we're using image that will go in src
// otherwise, gets lost in the production build
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const logo = (props) => (

  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo}  alt="burgerLogo" />
  </div>

);

export default logo;
