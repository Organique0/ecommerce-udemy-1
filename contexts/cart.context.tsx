"use client"
import { Product } from "@/components/product-card/product-card.component";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    cartOpen: false,
    setCartOpen: (isOpen: boolean) => { },
    cartItems: [] as ProductWithQuantity[],
    addItemToCart: (item: ProductWithQuantity) => { },
    cartItemsCount: 0 as Number,
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
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Array<ProductWithQuantity>>([]);
    const [cartItemsCount, setCartItemsCount] = useState<number>(0);

    const addCartItem = (cartItems: ProductWithQuantity[], itemToAdd: ProductWithQuantity) => {
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
        setCartItems(addCartItem(cartItems, item));
    };

    const countItemsInCart = (cartItems: Array<ProductWithQuantity>) => {
        if (!cartItems) return 0;
        return cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity;
        }, 0);
    }

    useEffect(() => {
        setCartItemsCount(countItemsInCart(cartItems));
    }, [cartItems]);


    const toggleCart = (isOpen: boolean) => {
        setCartOpen(isOpen);
    };
    const value: CartContextValue = { cartOpen, setCartOpen: toggleCart, cartItems, addItemToCart, cartItemsCount };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
