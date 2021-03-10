import React, { Component } from 'react';
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

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  // Fetch the ingredients from DB
  componentDidMount() {
    // axios
    //   .get(
    //     'https://react-burger-builder-86ac9-default-rtdb.firebaseio.com/ingredients.json'
    //   )
    //   .then((res) => {
    //     const fetchedIngredients = res.data;
    //     this.setState({ ingredients: fetchedIngredients });
    //   })
    //   .catch((err) => {});
  }

  // Calculates the total amount of ingredients and updates the purchaseable status accordingly
  // If the burger has no ingredients, it shouldn't be purchaseable (purchaseable = false)
  updatePurchaseState = (ingredients) => {
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
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  // Sets the 'purchasing' state to false when the user clicks the backdrop to cancel the order
  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  // TODO: handle purchase
  continuePurchaseHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    // Object that contains info of whether the remove button of a given ingredient should be disabled or not.
    // If the amount of that ingredient is equal or minor to 0, the button should be disabled.
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // UI initialization before data fetch
    let burger = <Spinner />;
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            order={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          orderCancelled={this.cancelPurchaseHandler}
          orderContinued={this.continuePurchaseHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    // Replaces the OrderSummary with a Spinner if the user continues to checkout
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
