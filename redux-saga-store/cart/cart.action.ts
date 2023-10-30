import { Product } from "@/components/product-card/product-card.component";
import { CART_ACTIONS, CartItem, CartState, ProductWithQuantity } from "./cart.types";
import createAction from "@/utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean: Boolean) => createAction(CART_ACTIONS.TOGGLE_CART_OPEN, boolean);

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

export const addItemToCart = (cartItems: CartItem[], item: Product) => {
    const newCartItems = addCartItem(cartItems, item);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems)
};

export const removeCartItem = (cartItems: CartItem[], itemToRemove: ProductWithQuantity) => {
    const newCartItems = removeItemFromCart(cartItems, itemToRemove);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems)
};

export const removeAllOfItemInCart = (cartItems: CartItem[], itemToRemove: ProductWithQuantity) => {
    const newCartItems = removeAllOfItem(cartItems, itemToRemove);
    return createAction(CART_ACTIONS.SET_CART_ITEMS, newCartItems)
}

