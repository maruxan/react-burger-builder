import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  // Fetch the ingredients from DB
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  // Calculates the total amount of ingredients and updates the purchaseable status accordingly
  // If the burger has no ingredients, it shouldn't be purchaseable (purchaseable = false)
  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  // Sets the 'purchasing' state to true when the user clicks the order button
  // If the user is not authenticated, the button redirects the user to the auth page
  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      // Redirects to the checkout page once the user is authenticated
      // this way, the user doesn't lose the burger it builded
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  // Sets the 'purchasing' state to false when the user clicks the backdrop to cancel the order
  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  };

  // TODO: handle purchase
  const continuePurchaseHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  // Object that contains info of whether the remove button of a given ingredient should be disabled or not.
  // If the amount of that ingredient is equal or minor to 0, the button should be disabled.
  const disabledInfo = { ...props.ings };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  // UI initialization before data fetch
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  let orderSummary = null;

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(props.ings)}
          order={purchaseHandler}
          price={props.price}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        orderCancelled={cancelPurchaseHandler}
        orderContinued={continuePurchaseHandler}
        ingredients={props.ings}
        price={props.price}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={cancelPurchaseHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseBurgerInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
