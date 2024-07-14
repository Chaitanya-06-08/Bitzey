import { createSlice } from "@reduxjs/toolkit";
let initialState = localStorage.getItem("cart");
if (!initialState) {
  initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
  };
} else {
  initialState = JSON.parse(initialState);
}
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      let item = action.payload;
      let cart = state;
      let index = cart.items.findIndex(
        (cartitem) => cartitem.item._id == item._id
      );
      if (index == -1) {
        cart.items.push({ item: item, quantity: 1 });
      } else {
        cart.items[index].quantity += 1;
      }
      cart.totalQuantity += 1;
      cart.totalPrice += item.price;
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    },
    addBulkItemstocart(state, action) {
      let items = action.payload;
      let cart = state;
      items.map((itemObj) => {
        let item = itemObj.item;
        let index = cart.items.findIndex(
          (cartitem) => cartitem.item._id == item._id
        );
        if (index == -1) {
          cart.items.push({ item: item, quantity: itemObj.quantity });
        } else {
          cart.items[index].quantity += itemObj.quantity;
        }
        cart.totalQuantity += itemObj.quantity;
        cart.totalPrice += item.price * itemObj.quantity;
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    },
    reduceQuantity(state, action) {
      let item = action.payload;
      let cart = state;
      let index = cart.items.findIndex(
        (cartitem) => cartitem.item._id == item._id
      );
      cart.items[index].quantity -= 1;
      cart.totalPrice -= item.price;
      cart.totalQuantity -= 1;
      if (cart.items[index].quantity == 0) {
        cart.items = cart.items.filter(
          (cartitem) => cartitem.item._id != item._id
        );
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    },
    clearCart(state) {
      let newCart = {
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
      };
      localStorage.removeItem("cart");
      return newCart;
    },
    deleteFromCart(state, action) {
      let item = action.payload;
      let cart = state;
      let index = cart.items.findIndex(
        (cartitem) => cartitem.item._id == item._id
      );
      cart.totalPrice -= item.price * cart.items[index].quantity;
      cart.totalQuantity -= cart.items[index].quantity;
      cart.items = cart.items.filter(
        (cartitem) => cartitem.item._id != item._id
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    },
  },
});
export const cartActions = cartSlice.actions;
