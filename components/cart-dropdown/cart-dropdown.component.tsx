"use client"
import { useContext } from "react";
import Button from "../button/Button"
import "./cart-dropdown.styles.scss"
import { CartContext } from "@/contexts/cart.context";
import CartItem from "../cart-item/CartItem";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items" >
                {cartItems.map((product) => (
                    <CartItem cartItem={product} />
                ))}
            </div>
            <Button type="button">Go to checkout</Button>
        </div>
    )
}

export default CartDropdown