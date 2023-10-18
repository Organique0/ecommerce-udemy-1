"use client"
import { ProductWithQuantity } from "@/contexts/cart.context"
import Image from "next/image";
import "./checkout-item.styles.scss"

const CartItemCheckout = ({ product, add, remove, removeAll }: { product: ProductWithQuantity, add: (item: ProductWithQuantity) => void, remove: (item: ProductWithQuantity) => void, removeAll: (item: ProductWithQuantity) => void }) => {
    const { id, imageUrl, name, price, quantity } = product;
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <Image src={imageUrl} width={200} height={200} alt={`product-${id}`} />
            </div>
            <div className="name">
                {name}
            </div>
            <div className="quantity">
                <span className="arrow" onClick={() => remove(product)}>{`<`}</span>
                <div className="value">{quantity}</div>
                <span className="arrow" onClick={() => add(product)}>{`>`}</span>
            </div>
            <div className="price">
                {price}
            </div>
            <td>
                <span className="remove-button" onClick={() => removeAll(product)}>X</span>
            </td>
        </div>
    )
}

export default CartItemCheckout