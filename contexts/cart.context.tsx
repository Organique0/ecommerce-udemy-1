"use client"
//Here as an example of using React context
import { createContext, useReducer, Reducer } from "react";
import { createAction } from "@/utils/reducer/reducer.utils"
import { CategoryItemWithQuantity } from "@/redux-saga-store/cart/cart.types";


interface CartContextValue {
    cartOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
    cartItems: Array<CategoryItemWithQuantity>,
    addItemToCart: (item: CategoryItemWithQuantity) => void;
    cartItemsCount: number,
    cartItemsTotal: number,
    removeCarItem: (itemToRemove: CategoryItemWithQuantity) => void;
    removeAllOfItemInCart: (itemToRemove: CategoryItemWithQuantity) => void;
}

type CartState = {
    cartOpen: boolean;
    cartItems: CategoryItemWithQuantity[];
    cartItemsCount: number;
    cartItemsTotal: number;
};

const INITIAL_STATE: CartState = {
    cartOpen: false,
    cartItems: [] as CategoryItemWithQuantity[],
    cartItemsCount: 0 as number,
    cartItemsTotal: 0 as number,
}

const CART_ACTIONS = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
}

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: (isOpen: boolean) => { },
    cartItems: [] as CategoryItemWithQuantity[],
    addItemToCart: (item: CategoryItemWithQuantity) => { },
    cartItemsCount: 0 as Number,
    cartItemsTotal: 0 as Number,
    removeCarItem: (itemToRemove: CategoryItemWithQuantity) => { },
    removeAllOfItemInCart: (itemToRemove: CategoryItemWithQuantity) => { },
});

const cartReducer: Reducer<CartState, any> = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTIONS.TOGGLE_CART_OPEN:
            return {
                ...state,
                cartOpen: payload,
            }
        default:
            throw new Error(`unhandled type ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [{ cartItems, cartOpen, cartItemsCount, cartItemsTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


    const updateCartItems = (newCartItems: Array<CategoryItemWithQuantity>) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);

        const newCartItemsTotal = newCartItems.reduce((total, cartItem) => {
            return total + cartItem.price * cartItem.quantity;
        }, 0);

        dispatch(
            //"optimization"
            createAction(CART_ACTIONS.SET_CART_ITEMS, { cartItems: newCartItems, cartItemsTotal: newCartItemsTotal, cartItemsCount: newCartCount })
        )
    }


    const addCartItem = (itemToAdd: CategoryItemWithQuantity) => {
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
    const addItemToCart = (item: CategoryItemWithQuantity) => {
        const newCartItems = addCartItem(item);
        updateCartItems(newCartItems);
    };

    const removeItemFromCart = (itemToRemove: CategoryItemWithQuantity) => {
        const existingCartItem = cartItems.find((cartItem) => itemToRemove.id === cartItem.id);

        if (existingCartItem && existingCartItem.quantity == 1) {
            return removeAllOfItem(itemToRemove);
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
    const removeCarItem = (itemToRemove: CategoryItemWithQuantity) => {
        const newCartItems = removeItemFromCart(itemToRemove);
        updateCartItems(newCartItems);
    };


    const removeAllOfItem = (itemToRemove: CategoryItemWithQuantity) => {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }
    const removeAllOfItemInCart = (itemToRemove: CategoryItemWithQuantity) => {
        const newCartItems = removeAllOfItem(itemToRemove);
        updateCartItems(newCartItems);
    }

    const setCartOpen = (bool: Boolean) => {
        dispatch(createAction(CART_ACTIONS.TOGGLE_CART_OPEN, bool));
    };
    const value: CartContextValue = { cartOpen, setCartOpen, cartItems, addItemToCart, cartItemsCount, cartItemsTotal, removeCarItem, removeAllOfItemInCart };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
