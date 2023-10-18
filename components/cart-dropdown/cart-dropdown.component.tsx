"use client"
import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button"
import "./cart-dropdown.styles.scss"
import { CartContext } from "@/contexts/cart.context";
import CartItem from "../cart-item/CartItem";
import { useRouter } from "next/navigation";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const router = useRouter()
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items" >
                {cartItems.map((product) => (
                    <CartItem cartItem={product} />
                ))}
            </div>
            <Button type="button" buttonType={BUTTON_TYPE_CLASSES.base} onClick={() => router.push('/checkout')}>Go to checkout</Button>
        </div>
    )
}

export default CartDropdown