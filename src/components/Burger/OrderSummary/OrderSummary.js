import React from 'react';

import Aux from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <p>
            <span style={{ textTransform: 'capitalize' }}>
              {ingredientKey}:
            </span>{' '}
            {props.ingredients[ingredientKey]}
          </p>
        </li>
      );
    }
  );

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.orderCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.orderContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
