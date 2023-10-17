import { ProductWithQuantity } from "@/contexts/cart.context"
import Image from "next/image";
import "./checkout-item.styles.scss"




const CartItemCheckout = ({ product, add, remove, removeAll }: { product: ProductWithQuantity, add: (item: ProductWithQuantity) => void, remove: (item: ProductWithQuantity) => void, removeAll: (item: ProductWithQuantity) => void }) => {
    const { id, imageUrl, name, price, quantity } = product;
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <Image src={imageUrl} width={20} height={20} alt={`product-${id}`} />
            </div>
            <div className="name">
                {name}
            </div>
            <div className="quantity">
                <button className="arrow" onClick={() => remove(product)}>down</button>
                <div className="value">{quantity}</div>
                <button className="arrow" onClick={() => add(product)}>up</button>
            </div>
            <div className="price">
                {price}
            </div>
            <td>
                <button type="button" onClick={() => removeAll(product)}>X</button>
            </td>
        </div>
    )
}

export default CartItemCheckout