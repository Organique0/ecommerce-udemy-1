"use client"
import Image from "next/image";
import "./checkout-item.styles.scss"
import { CartItem, ProductWithQuantity } from "@/store/cart/cart.types";
import { useDispatch } from "react-redux";
//redux, saga, thunk
import { addItemToCart, removeAllOfItemInCart, removeCarItem } from "@/store/cart/cart.action";
//toolkit
import { addItemToCart as addItemToCartToolkit, removeCartItem, clearCartItem } from "@/redux-toolkit-store/cart/cart.reducer";

const CartItemCheckout = ({ product, cartItems }: { product: ProductWithQuantity, cartItems: CartItem[] }) => {
    const { id, imageUrl, name, price, quantity } = product;

    const dispatch = useDispatch();

    //old: dispatch(clearCart(cartItems, product)
    //before toolkit we had to pass in the cart items

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <Image src={imageUrl} width={200} height={200} alt={`product-${id}`} />
            </div>
            <div className="name">
                {name}
            </div>
            <div className="quantity">
                <span className="arrow" onClick={() => dispatch(removeCartItem(product))}>{`<`}</span>
                <div className="value">{quantity}</div>
                <span className="arrow" onClick={() => dispatch(addItemToCartToolkit(product))}>{`>`}</span>
            </div>
            <div className="price">
                {price}
            </div>
            <td>
                <span className="remove-button" onClick={() => dispatch(clearCartItem(product))}>X</span>
            </td>
        </div>
    )
}

export default CartItemCheckout
