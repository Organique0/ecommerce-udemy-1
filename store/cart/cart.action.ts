
import { CategoryItem } from "@/redux-saga-store/categories/category.types";
import { CART_ACTIONS, CartItem } from "./cart.types";
import { createAction } from "@/utils/reducer/reducer.utils";
import { CategoryItemWithQuantity } from "@/redux-saga-store/cart/cart.types";

export const setIsCartOpen = (boolean: Boolean) => createAction(CART_ACTIONS.TOGGLE_CART_OPEN, boolean);

const addCartItem = (cartItems: CartItem[], itemToAdd: CategoryItem) => {
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

const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CategoryItemWithQuantity) => {
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

const removeAllOfItem = (cartItems: CartItem[], itemToRemove: CategoryItemWithQuantity) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
}

export const addItemToCart = (cartItems: CartItem[], item: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, item);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems)
};

export const removeCartItem = (cartItems: CartItem[], itemToRemove: CategoryItemWithQuantity) => {
    const newCartItems = removeItemFromCart(cartItems, itemToRemove);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems)
};

export const removeAllOfItemInCart = (cartItems: CartItem[], itemToRemove: CategoryItemWithQuantity) => {
    const newCartItems = removeAllOfItem(cartItems, itemToRemove);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems)
}

