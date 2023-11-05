import { CART_ACTIONS_TYPES, CategoryItemWithQuantity, CartState } from "./cart.types";
import { ActionWithPayload, createAction, withMatcher } from "@/utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

export type SetIsCartOpen = ActionWithPayload<CART_ACTIONS_TYPES.TOGGLE_CART_OPEN, boolean>;
export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTIONS_TYPES.TOGGLE_CART_OPEN, boolean));

const addCartItem = (cartItems: CategoryItemWithQuantity[], itemToAdd: CategoryItem): CategoryItemWithQuantity[] => {
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

const removeItemFromCart = (cartItems: CategoryItemWithQuantity[], itemToRemove: CategoryItemWithQuantity): CategoryItemWithQuantity[] => {
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

export type SetCartItems = ActionWithPayload<CART_ACTIONS_TYPES.SET_CART_ITEMS, CategoryItemWithQuantity[]>;
export const setCartItems = withMatcher((cartItems: CategoryItemWithQuantity[]): SetCartItems => createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems));

const removeAllOfItem = (cartItems: CategoryItemWithQuantity[], itemToRemove: CategoryItemWithQuantity): CategoryItemWithQuantity[] => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
}

export const addItemToCart = (cartItems: CategoryItemWithQuantity[], item: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, item);
    return setCartItems(newCartItems);
};

export const removeCartItem = (cartItems: CategoryItemWithQuantity[], itemToRemove: CategoryItemWithQuantity) => {
    const newCartItems = removeItemFromCart(cartItems, itemToRemove);
    return setCartItems(newCartItems);
};

export const removeAllOfItemInCart = (cartItems: CategoryItemWithQuantity[], itemToRemove: CategoryItemWithQuantity) => {
    const newCartItems = removeAllOfItem(cartItems, itemToRemove);
    return setCartItems(newCartItems);
}

