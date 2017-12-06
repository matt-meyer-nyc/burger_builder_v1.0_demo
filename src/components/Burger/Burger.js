import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  // extracts keys of a given object and turns it into an array (values not part of array)
  let transformIngredients = Object.keys(props.ingredients)
   .map(igKey => {

     return [...Array(props.ingredients[igKey])].map((_, i) => {

       return <BurgerIngredient key={igKey+i} type={igKey} />

     })
     // looking to flatten area with reduce so can access nested arrays inside the array the above produces
     // method that takes 2 arguments (previous value and current value)
   }).reduce((arr, el) => {
     // adjust initial reduced value by
     // looping through all elements and add to the initial value step by step

     // arr is always update root array to return in end
     // then take given element and add to the root array (i.e. '.concat(el)')
     return arr.concat(el)

   }, [])

if (transformIngredients.length === 0) {

  transformIngredients = <p>Please start adding Ingredients</p>

}


  return (

    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>

  );

}

export default burger;
