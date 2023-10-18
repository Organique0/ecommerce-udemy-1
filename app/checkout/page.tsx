"use client"
import CartItemCheckout from "@/components/cart-item-checkout/CartItemCheckout";
import { CartContext } from "@/contexts/cart.context";
import { useContext } from "react";
import "./checkout.styles.js"
import { CheckoutContainer, CheckoutHeader, Total } from "./checkout.styles.js";

const page = () => {
    const { cartItems, addItemToCart, removeCarItem, removeAllOfItemInCart, cartItemsTotal } = useContext(CartContext);
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <div className="header-block">
                    Product
                </div>
                <div className="header-block">
                    Description
                </div>
                <div className="header-block">
                    Quantity
                </div>
                <div className="header-block">
                    Price
                </div>
                <div className="header-block">
                    Remove
                </div>
            </CheckoutHeader>
            {cartItems.map((product) => (
                <CartItemCheckout product={product} add={addItemToCart} remove={removeCarItem} removeAll={removeAllOfItemInCart} />
            ))}
            <Total>
                Total: {cartItemsTotal as React.ReactNode}
            </Total>
        </CheckoutContainer>
    )
}

export default page