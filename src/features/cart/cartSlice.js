import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      state.cart.splice(
        state.cart.findIndex((item) => item.pizzaId === action.payload),
        1,
      );
    },
    incrementQuantity(state, action) {
      const item = state.cart.find((it) => it.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decrementQuantity(state, action) {
      const item = state.cart.find((it) => it.pizzaId === action.payload);
      if (item.quantity === 1) {
        // state.cart.splice(
        //   state.cart.findIndex((item) => item.pizzaId === action.payload),
        //   1,
        // );
        cartSlice.caseReducers.removeItem(state, action);
      } else {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export default cartSlice.reducer;
export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export const getNumberOfPizza = createSelector(
  (state) => state.cart?.cart,
  (cart) => cart.reduce((acc, it) => acc + it.quantity, 0),
);
export const getTotolPrice = createSelector(
  (state) => state.cart.cart,
  (cart) => cart.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
);
export const getQuantityById = (id) =>
  createSelector(
    (state) => state.cart.cart,
    (cart) => cart.find((item) => item.pizzaId === id)?.quantity || 0,
  );
