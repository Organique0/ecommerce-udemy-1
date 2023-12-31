"use client"
import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button"
import "./cart-dropdown.styles"
import { CartContext } from "@/contexts/cart.context";
import CartItem from "../cart-item/CartItem";
import { useRouter } from "next/navigation";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles";
import { useSelector } from "react-redux";
//saga
import { selectCartItems } from "@/redux-saga-store/cart/cart.selector";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    //const { cartItems } = useContext(CartContext);
    const router = useRouter()
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    !cartItems.length && (
                        <EmptyMessage>your cart is empty</EmptyMessage>
                    )
                }
                {cartItems.map((product) => (
                    <CartItem {...product} />
                ))}
            </CartItems>
            <Button type="button" buttonType={BUTTON_TYPE_CLASSES.base} onClick={() => router.push('/checkout')}>Go to checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown