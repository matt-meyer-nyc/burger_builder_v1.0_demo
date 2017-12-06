import React from 'react';
import { NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (

  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      // have to set this, or else won't work with css modules,
      // since css modules create unique hash id for classes created (including element.active)
      activeClassName={classes.active}
      exact // exact must be implemented to make sure active class is only added to specific page route and not all of them
      >{props.children}</NavLink>
  </li>

);

export default navigationItem;
