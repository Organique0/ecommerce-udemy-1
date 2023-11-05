
import { CategoryItem } from "../categories/category.types";

/* export type ProductWithQuantity = Product & {
    quantity: number;
}; */
export const CART_ACTIONS = {
    SET_CART_ITEMS: "cart/SET_CART_ITEMS",
    TOGGLE_CART_OPEN: "cart/TOGGLE_CART_OPEN",
    SET_CART_COUNT: "cart/SET_CART_COUNT",
    SET_CART_TOTAL: "cart/SET_CART_TOTAL",
}
export type CartState = {
    cartOpen: boolean;
    cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
    cartOpen: false,
    cartItems: [] as CartItem[],
}

export type CartItem = CategoryItem & {
    quantity: number;
};