import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions'; // picks up /actions/index.js file

//moved to reducer.js
/*
const INGREDIENT_PRICES = {

  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7

}
*/

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super();
  //
  //   this.state = {
  //
  //   }
  //
  // }


  state = {

    // purchasable: false,

    purchasing: false,

    // loading: false,
    //
    // error: false

  }

  componentDidMount() {
    console.log(this.props);

    this.props.onInitIngredients();

  }


  updatePurchaseState (ingredients) {

    // create array of string entries ("salad", "bacon", etc.)
    const sum = Object.keys(ingredients)
      .map(igKey => {
        //create array of values
        return ingredients[igKey]

        // note el is value returned above
        // i.e. from return ingredients[igKey]
        // sum is intial value
      }).reduce((sum, el) => {

        return sum + el;

      },0);

      return sum > 0;
      // above updated from below when were previously using purchable in state
      //this.setState({purchasable: sum > 0});

  }



  // addIngredientHandler = (type) => {
  //
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice =this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }
  //
  //
  //
  // removeIngredientHandler = (type) => {
  //
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice =this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  //
  // }

  purchaseHandler = () => {

    if (this.props.isAuthenticated) {

      this.setState({purchasing: true})

      } else {

        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push("/auth");

    }

  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
             // history provided by react router
            // this redirects to /checkout page
    /*-------------------
       BELOW NOW HANDLED BY REDUX
    ---------------------
    const queryParams = [];

    for (let i in this.state.ingredients) {
      // encodeURIComponent) JS helper method that encodes
      // elements so can be used in url
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
      // above creates arroy of strings 'propertyname = propertyvalue'
    }

    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&')
    ----------
    ---------*/
    this.props.onInitPurchase();

      // optimized from below since not using query params anymore
    this.props.history.push('/checkout');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });

  }



  render() {

    const disabledInfo = {
      ...this.props.ings // property pulled from mapStateToProps
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
      // returns true or false
    }

    let orderSummary = null;

    let burger  =  this.props.error ? <p>Ingredient's can't be laoded!</p> : <Spinner />;

    if (this.props.ings) { // property pulled from mapStateToProps

      burger =  (
          <Aux>
            <Burger ingredients={this.props.ings}/>  {/*property pulled from mapStateToProps*/}
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded} // property passed from mapDispatchToProps
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)} // needs to be execute b/c want to execute whenever this prop gets rerendered
              ordered={this.purchaseHandler}
              price={this.props.price}
              isAuth={this.props.isAuthenticated}
            />
          </Aux>
      );
      orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
              />

    }

    return (

      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>

    );

  }

}
             //  global state from reducer.js
const mapStateToProps = state => {

  return {

    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null

  };

}

const mapDispatchToProps = dispatch => {

  return {
     onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
     onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
     onInitIngredients: () => dispatch(actions.initIngredients()),
     onInitPurchase: () => dispatch(actions.purchaseInit()),
     onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
