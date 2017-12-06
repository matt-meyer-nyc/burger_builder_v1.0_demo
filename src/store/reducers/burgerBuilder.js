import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState =  {
        // null until fetched from server
        // also makes sure, in burgerBuilder, the check fails if don't have ingredients ('if (this.props.ing) { burger = ... }')
      ingredients: null,

      totalPrice: 4, //burger base price

      error: false, // will be set to true if loading from server fails,

      building: false

};

const INGREDIENT_PRICES = {

  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7

}

const addIngredient = (state, action) => {
    // '[]' here used as ES6 syntax to override copy of current state
    // override value gets set to number of old ingredients plus 1 for whatever ingredient has been selected
  // final return is new version of state with updated ingredients
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {

  ingredients: updatedIngredients,
  totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  building: true

  }

  return updateObject(state, updatedState)

}

const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {

    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true

  }

return updateObject(state, updatedSt)

}

const setIngredients = (state, action) => {
  return updateObject(state, {

    ingredients: {  //note: acion.ingredients would suffice as value, but updated to this object to switch the order set returned from Firebase (which is locked in as alphabetical)
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    //set error to false to reset incase had error that's been corrected
    totalPrice: 4, // reset to initial price
    error: false,
    building: false

  });

}

const fetchIngredientsFailed = (state, action) => {

  return updateObject(state, {error: true });

}

const reducer = (state = initialState, action) => {

  switch(action.type) {

    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    // executed when ingredients from server are recieved
    // corresponds to setIngredients function in burgerBuilder action file
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    // handle case that setIngredients fails
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;

  }

};

export default reducer;
