"use client"
import CartItemCheckout from "@/components/cart-item-checkout/CartItemCheckout";
import { CartContext } from "@/contexts/cart.context";
import { useContext } from "react";
import { CheckoutContainer, CheckoutHeader, Total } from "./checkout.styles.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "@/redux-saga-store/cart/cart.selector";
import PaymentForm from "@/components/payment-form/PaymentForm"

const page = () => {
    //const { cartItems, addItemToCart, removeCarItem, removeAllOfItemInCart, cartItemsTotal } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartItemsTotal = useSelector(selectCartTotal);
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
                <CartItemCheckout product={product} cartItems={cartItems} />
            ))}
            <Total>
                Total: {cartItemsTotal as React.ReactNode}
            </Total>
            <PaymentForm />
        </CheckoutContainer>
    )
}

export default page

