import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { cart } from "../../types";
type cartState = {
  items: cart[];
};
const initialState: cartState = {
  items: useLocalStorage(),
};
type addToCartAction = {
  type: string;
  payload: cart;
};
type removeFromCartAction = {
  type: string;
  payload: number;
};
type increaseAction = removeFromCartAction;
type decreaseAction = removeFromCartAction;
type emptyCartAction = {
  type: string;
};
type state = {
  cart: {
    items: cart[];
  };
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: addToCartAction) {
      // gets the new item that is to be added to the cart and increase's it's quantity by 1
      let { quantity } = action.payload;
      quantity = quantity < 1 ? 1 : quantity;
      state.items = [...state.items, { ...action.payload, quantity }];
      // i could have used a push but i wanted to keep it as close to redux as possible.
    },
    emptyCart: (state, _action: emptyCartAction) => {
      state.items = [];
    },
    increaseItemQuantity(state, action: increaseAction) {
      state.items = state.items.map((item) => {
        // find the cart item
        if (item.id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        // increase the quantity
        return item;
      });
    },
    decreaseItemQuantity(state, action: decreaseAction) {
      //find the cart item
      state.items = state.items.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      // decrease the quantity and check if the quantity is greater than zero
    },
    removeFromCart(state, action: removeFromCartAction) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeFromCart,
  emptyCart,
} = cartSlice.actions;
export const selectItem = (state: state) => state.cart.items;
// finds the totla price of all the items in our cart.
export const totalPrice = (state: state) =>
  state.cart.items.reduce((acc, next) => acc + next.price * next.quantity, 0);
export default cartSlice.reducer;
