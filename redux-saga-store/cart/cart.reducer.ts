import { Reducer } from "redux";
import { CART_INITIAL_STATE, CartState } from "./cart.types";
import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";


export const cartReducer: Reducer<CartState, any> = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            cartOpen: action.payload,
        }
    }
    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        }
    }

    return state;


    /*     const { type, payload } = action;
    
        switch (type) {
            case CART_ACTIONS_TYPES.SET_CART_ITEMS:
                return {
                    ...state,
                    cartItems: payload
                }
            case CART_ACTIONS_TYPES.TOGGLE_CART_OPEN:
                return {
                    ...state,
                    cartOpen: payload,
                }
            default:
                return state;
        } */
}