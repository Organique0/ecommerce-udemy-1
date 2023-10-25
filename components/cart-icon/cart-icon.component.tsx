import "./cart-icon.styles.scss";
import React, { useContext } from "react";
import cartIcon from "./../../assets/shopping-bag.svg"
import Image from "next/image";
import { CartContext } from "@/contexts/cart.context";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "@/store/cart/cart.selector";
import { setIsCartOpen } from "@/store/cart/cart.action";

const CartIconComponent = () => {
    //const { cartOpen, setCartOpen, cartItemsCount } = useContext(CartContext);
    const cartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    const cartItemsCount = useSelector(selectCartCount);

    return (
        <div className="cart-icon-container" onClick={() => dispatch(setIsCartOpen(!cartOpen))}>
            <Image src={cartIcon} alt="cart-icon" className="shopping-icon" />
            <span className="item-count">{cartItemsCount}</span>
        </div>
    )
}

export default CartIconComponent