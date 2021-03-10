import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  // Ingredients object from props is converted to an array of objects
  // containing each ingredient and it's amount
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  // The array of ingredients objects is converted to a displayable html element
  const outputIngredients = ingredients.map((ig) => (
    <span
      key={ig.name}
      style={{
        display: 'inline-block',
        margin: '0 10px',
        padding: '8px',
        border: '1px solid #eee',
      }}>
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {outputIngredients}</p>
      <p>
        Price: <strong>$ {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
