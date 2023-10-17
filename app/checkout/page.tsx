"use client"
import CartItemCheckout from "@/components/cart-item-checkout/CartItemCheckout";
import { CartContext } from "@/contexts/cart.context";
import { useContext } from "react";
import "./checkout.styles.scss"

const page = () => {
    const { cartItems, addItemToCart, removeCarItem, removeAllOfItemInCart, cartItemsTotal } = useContext(CartContext);
    return (
        <div className="checkout-container" >
            <div className="checkout-header">
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
            </div>
            {cartItems.map((product) => (
                <CartItemCheckout product={product} add={addItemToCart} remove={removeCarItem} removeAll={removeAllOfItemInCart} />
            ))}
            <span className="total">
                Total: {cartItemsTotal as React.ReactNode}
            </span>
        </div>
    )
}

export default page