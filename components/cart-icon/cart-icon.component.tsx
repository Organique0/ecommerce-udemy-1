import "./cart-icon.styles.scss";
import React, { useContext } from "react";
import cartIcon from "./../../assets/shopping-bag.svg"
import Image from "next/image";
import { CartContext } from "@/contexts/cart.context";

const CartIconComponent = () => {
    const { cartOpen, setCartOpen, cartItemsCount } = useContext(CartContext);

    return (
        <div className="cart-icon-container" onClick={() => setCartOpen(!cartOpen)}>
            <Image src={cartIcon} alt="cart-icon" className="shopping-icon" />
            <span className="item-count">{cartItemsCount}</span>
        </div>
    )
}

export default CartIconComponent