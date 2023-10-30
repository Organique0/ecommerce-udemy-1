import { Reducer } from "redux";
import { CART_ACTIONS, CART_INITIAL_STATE, CartState } from "./cart.types";

export const cartReducer: Reducer<CartState, any> = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTIONS.TOGGLE_CART_OPEN:
            return {
                ...state,
                cartOpen: payload,
            }
        default:
            return state;
    }
}