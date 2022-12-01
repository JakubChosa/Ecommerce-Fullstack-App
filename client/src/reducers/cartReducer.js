import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
} from "../context/actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, mainColor, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + mainColor);

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + mainColor) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + mainColor,
        name: product.name,
        color: mainColor,
        amount,
        image: product.image,
        price: product.price,
        max: product.inventory,
        freeShipping: product.freeShipping,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "increase") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "decrease") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;

        total.totalItems += amount;
        total.totalAmount += price * amount;
        return total;
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    );
    return { ...state, totalItems, totalAmount };
  }
  if (action.type === GET_ORDERS_BEGIN) {
    return { ...state, order_error: false, order_loading: true };
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    const { orders } = action.payload;
    return {
      ...state,
      orders: orders,
      order_error: false,
      order_loading: false,
    };
  }
  if (action.type === GET_ORDERS_ERROR) {
    return { ...state, order_error: true, order_loading: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
