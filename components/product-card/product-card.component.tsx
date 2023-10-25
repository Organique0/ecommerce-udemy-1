"use client"
import "./product-card.styles.scss"
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/contexts/cart.context"
import { addItemToCart } from "@/store/cart/cart.action"
import { useDispatch, useSelector } from "react-redux"
import { selectCartItems } from "@/store/cart/cart.selector"

export interface Product {
  id: number,
  name: string,
  imageUrl: string,
  price: number,
}

const ProductCard = ({ product }: { product: Product }) => {
  const { name, price, imageUrl } = product
  //const { addItemToCart } = useContext(CartContext)

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  function handleAddToCart(product: Product) {
    dispatch(addItemToCart(cartItems, product))
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [])

  return (
    <div className="product-card-container">
      <Image src={imageUrl} alt={`${name}`} fill />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      {mounted && <Button buttonType={BUTTON_TYPE_CLASSES.base} type="button" onClick={() => handleAddToCart(product)}>
        Add to cart
      </Button>}
    </div>
  )
}

export default ProductCard