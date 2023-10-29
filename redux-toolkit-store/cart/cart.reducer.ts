import { Product } from "@/components/product-card/product-card.component";
import { CART_ACTIONS, CART_INITIAL_STATE, CartItem, CartState, ProductWithQuantity } from "./cart.types";
import { createSlice } from "@reduxjs/toolkit";
import createAction from "@/utils/reducer/reducer.utils";

const addCartItem = (cartItems: CartItem[], itemToAdd: Product) => {
    const existingCartItem = cartItems.find((cartItem) => itemToAdd.id === cartItem.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === itemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem;
        });
    }

    return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

const removeItemFromCart = (cartItems: CartItem[], itemToRemove: ProductWithQuantity) => {
    const existingCartItem = cartItems.find((cartItem) => itemToRemove.id === cartItem.id);

    if (existingCartItem && existingCartItem.quantity == 1) {
        return removeAllOfItem(cartItems, itemToRemove);
    }
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === itemToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem;
        });
    }

    return [...cartItems, { ...itemToRemove }];
}
const removeAllOfItem = (cartItems: CartItem[], itemToRemove: ProductWithQuantity) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: CART_INITIAL_STATE,
    reducers: {
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeCartItem(state, action) {
            state.cartItems = removeItemFromCart(state.cartItems, action.payload);
        },
        clearCartItem(state, action) {
            state.cartItems = removeAllOfItem(state.cartItems, action.payload);
        },
        setIsCartOpen(state, action) {
            state.cartOpen = action.payload
        }
    }
})

export const {
    setIsCartOpen,
    addItemToCart,
    removeCartItem,
    clearCartItem,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;