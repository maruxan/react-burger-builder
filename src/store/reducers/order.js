import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchasing: false,
};

const purchaseBurgerInit = (state, action) => {
  return {
    ...state,
    purchasing: true,
  };
};

const purchaseBurgerStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.oderData,
    id: action.orderId,
  };
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
    purchasing: false,
  };
};

const purchaseBurgerFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const fetchOrderStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchOrderSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false,
  };
};

const fetchOrderFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return purchaseBurgerInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
