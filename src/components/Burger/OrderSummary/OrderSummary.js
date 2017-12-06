import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

// this could be a functional component
class OrderSummary extends Component {

  // the below is here for debugging,
  componentWillUpdate() {

  }

  render() {

    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {

      return (

        <li key={igKey}>
          <span style={{textTransfrom: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>

        )

    });

      return (

        <Aux>
          <h3>Your Order</h3>
          <p>A delicious burger that has:</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
          <p>Continue to Checkout?</p>
          <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>

      )

  }

}



export default OrderSummary;



/* originally, this was a functional component as shown below, but to optimize,
 lifecycles are implemented above since this component does a great deal of re-rendering
 */

//  const ingredientSummary = Object.keys(props.ingredients)
//  .map(igKey => {
//
//    return (
//
//      <li key={igKey}>
//        <span style={{textTransfrom: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
//      </li>
//
//      )
//
//  })
//
//  return (
//
//    <Aux>
//      <h3>Your Order</h3>
//      <p>A delicious burger that has:</p>
//      <ul>
//        {ingredientSummary}
//      </ul>
//      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//      <p>Continue to Checkout?</p>
//      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
//      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
//    </Aux>
//
//  )
//
// };
