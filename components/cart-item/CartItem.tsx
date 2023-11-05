"use client"
import Image from "next/image";
import "./cart-items.styles.scss"
import { CategoryItem } from "@/redux-saga-store/categories/category.types";
import { CategoryItemWithQuantity } from "@/redux-saga-store/cart/cart.types";

const CartItem = (cartItem: CategoryItemWithQuantity) => {
    return (
        <div className="cart-item-container">
            <Image src={cartItem.imageUrl} alt={`${cartItem.name}`} width={100} height={60} />
            <div className="item-details">
                <span className="name">{cartItem.name}</span>
                <span className="price">{cartItem.quantity} X {cartItem.price}</span>
            </div>
        </div>
    )
}

export default CartItem;