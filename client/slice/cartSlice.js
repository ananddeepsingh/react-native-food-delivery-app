import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const newCart = [...state.items];
      const itemIndex = state.items.findIndex((item) => item.id == action.payload.id);

      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("can't remove")
      }

      state.items = newCart;

    },
    emptyCart: (state, action) => {
      state.items = []
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeFromCart,
  emptyCart
} = cartSlice.actions

export const getCartItems = (state) => state.cart.items;
export const getCartItemsById = (state, id) => state.cart.items.filter((item) => item.id == id);
export const getCartTotal = (state) => state.cart.items.reduce((total, item) => total = total + item.price, 0)

export default cartSlice.reducer