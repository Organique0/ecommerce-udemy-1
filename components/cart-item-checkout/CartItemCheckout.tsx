"use client"
import Image from "next/image";
import "./checkout-item.styles.scss"
import { CartItem, ProductWithQuantity } from "@/store/cart/cart.types";
import { useDispatch } from "react-redux";
import { addItemToCart, removeAllOfItemInCart, removeCarItem } from "@/store/cart/cart.action";

const CartItemCheckout = ({ product, cartItems }: { product: ProductWithQuantity, cartItems: CartItem[] }) => {
    const { id, imageUrl, name, price, quantity } = product;

    const dispatch = useDispatch();

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <Image src={imageUrl} width={200} height={200} alt={`product-${id}`} />
            </div>
            <div className="name">
                {name}
            </div>
            <div className="quantity">
                <span className="arrow" onClick={() => dispatch(removeCarItem(cartItems, product))}>{`<`}</span>
                <div className="value">{quantity}</div>
                <span className="arrow" onClick={() => dispatch(addItemToCart(cartItems, product))}>{`>`}</span>
            </div>
            <div className="price">
                {price}
            </div>
            <td>
                <span className="remove-button" onClick={() => dispatch(removeAllOfItemInCart(cartItems, product))}>X</span>
            </td>
        </div>
    )
}

export default CartItemCheckout