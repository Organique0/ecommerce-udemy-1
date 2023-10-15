import "./product-card.styles.scss"
import Button from "../button/Button"
import Image from "next/image"

export interface Product {
  id: number,
  name: string,
  imageUrl: string,
  price: number,
}

const ProductCard = ({ product }: { product: Product }) => {
  const { name, price, imageUrl } = product
  return (
    <div className="product-card-container">
      <Image src={imageUrl} alt={`${name}`} fill />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" type="button">
        Add to cart
      </Button>
    </div>
  )
}

export default ProductCard