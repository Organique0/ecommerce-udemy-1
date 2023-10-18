"use client"
import { Product } from "@/components/product-card/product-card.component";
import { createContext, useEffect, useState } from "react";

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

export type ProductWithQuantity = Product & {
    quantity: number;
};

interface CartContextValue {
    cartOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
    cartItems: Array<ProductWithQuantity>,
    addItemToCart: (item: ProductWithQuantity) => void;
    cartItemsCount: Number,
    cartItemsTotal: Number,
    removeCarItem: (itemToRemove: ProductWithQuantity) => void;
    removeAllOfItemInCart: (itemToRemove: ProductWithQuantity) => void;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Array<ProductWithQuantity>>([]);
    const [cartItemsCount, setCartItemsCount] = useState<number>(0);
    const [cartItemsTotal, setCartItemsTotal] = useState<number>(0);

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
        setCartItems(addCartItem(item));
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
        setCartItems(removeItemFromCart(itemToRemove));
    };


    const removeAllOfItem = (itemToRemove: ProductWithQuantity) => {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
    }

    const removeAllOfItemInCart = (itemToRemove: ProductWithQuantity) => {
        setCartItems(removeAllOfItem(itemToRemove));
    }

    const countItemsInCart = () => {
        if (!cartItems) return 0;
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
    }

    const sumItemsInCart = () => {
        if (!cartItems) return 0;
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.price
        }, 0)
    }

    useEffect(() => {
        setCartItemsCount(countItemsInCart());
        setCartItemsTotal(sumItemsInCart());
        console.log(cartItemsTotal);
    }, [cartItems]);


    const toggleCart = (isOpen: boolean) => {
        setCartOpen(isOpen);
    };
    const value: CartContextValue = { cartOpen, setCartOpen: toggleCart, cartItems, addItemToCart, cartItemsCount, cartItemsTotal, removeCarItem, removeAllOfItemInCart };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
