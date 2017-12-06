import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'


const checkoutSummary = (props) => {

  return (

    <div className={classes.CheckoutSummary}>
      <h1>Best thing you'll eat all week!</h1>
      <div style={{width: '100%', marin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button
        btnType="Danger"
        clicked={props.checkoutCanceled}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>

  )


}

export default checkoutSummary;
