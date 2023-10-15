import { ProductWithQuantity } from "@/contexts/cart.context";

const CartItem = ({ cartItem }: { cartItem: ProductWithQuantity }) => {
    return (
        <div>
            <h2>{cartItem.name}</h2>
            <span>{cartItem.quantity}</span>
        </div>
    )
}

export default CartItem;