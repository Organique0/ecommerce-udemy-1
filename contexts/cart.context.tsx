"use client"
//Here as an example of using React context
import { Product } from "@/components/product-card/product-card.component";
import { createContext, useReducer, Reducer } from "react";
import createAction from "@/utils/reducer/reducer.utils"

export type ProductWithQuantity = Product & {
    quantity: number;
};

interface CartContextValue {
    cartOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
    cartItems: Array<ProductWithQuantity>,
    addItemToCart: (item: ProductWithQuantity) => void;
    cartItemsCount: number,
    cartItemsTotal: number,
    removeCarItem: (itemToRemove: ProductWithQuantity) => void;
    removeAllOfItemInCart: (itemToRemove: ProductWithQuantity) => void;
}

type CartState = {
    cartOpen: boolean;
    cartItems: ProductWithQuantity[];
    cartItemsCount: number;
    cartItemsTotal: number;
};

const INITIAL_STATE: CartState = {
    cartOpen: false,
    cartItems: [] as ProductWithQuantity[],
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
    cartItems: [] as ProductWithQuantity[],
    addItemToCart: (item: ProductWithQuantity) => { },
    cartItemsCount: 0 as Number,
    cartItemsTotal: 0 as Number,
    removeCarItem: (itemToRemove: ProductWithQuantity) => { },
    removeAllOfItemInCart: (itemToRemove: ProductWithQuantity) => { },
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


    const updateCartItems = (newCartItems: Array<ProductWithQuantity>) => {
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


    const addCartItem = (itemToAdd: ProductWithQuantity) => {
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
    const addItemToCart = (item: ProductWithQuantity) => {
        const newCartItems = addCartItem(item);
        updateCartItems(newCartItems);
    };

    const removeItemFromCart = (itemToRemove: ProductWithQuantity) => {
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
    const removeCarItem = (itemToRemove: ProductWithQuantity) => {
        const newCartItems = removeItemFromCart(itemToRemove);
        updateCartItems(newCartItems);
    };


    const removeAllOfItem = (itemToRemove: ProductWithQuantity) => {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }
    const removeAllOfItemInCart = (itemToRemove: ProductWithQuantity) => {
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
