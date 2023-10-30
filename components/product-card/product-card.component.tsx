"use client"
import "./product-card.styles.scss"
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/contexts/cart.context"
import { useDispatch, useSelector } from "react-redux"
import { selectCartItems } from "@/redux-saga-store/cart/cart.selector"
import Spinner from "../spinner/spinner.component"

import { selectCategoriesIsLoading as SCILSaga } from "@/redux-saga-store/categories/category.selector";
import { selectCategoriesIsLoading as SCILThunk } from "@/redux-thunk-store/categories/category.selector";

import { addItemToCart as addItemToCartRedux } from "@/store/cart/cart.action"
import { addItemToCart as addItemToCartSaga } from "@/redux-saga-store/cart/cart.action"
import { addItemToCart as addItemToCartThunk } from "@/redux-thunk-store/cart/cart.action"
import { addItemToCart as addItemToCartToolkit } from "@/redux-toolkit-store/cart/cart.reducer"

export interface Product {
  id: number,
  name: string,
  imageUrl: string,
  price: number,
}

const ProductCard = ({ product }: { product: Product }) => {
  const { name, price, imageUrl } = product
  //const { addItemToCart } = useContext(CartContext)

  //saga, not needed in toolkit
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  function handleAddToCart(product: Product) {
    dispatch(addItemToCartSaga(cartItems, product));
    //toolkit
    //in toolkit we do not pass cartItems
    //dispatch(addItemToCartToolkit(product));
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  //only in thunk and saga
  const isLoading = useSelector(SCILSaga);

  return (
    <div className="product-card-container">
      {!isLoading ?
        <>
          <Image src={imageUrl} alt={`${name}`} fill />
          <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
          </div>
          {mounted &&
            <Button buttonType={BUTTON_TYPE_CLASSES.base} type="button" onClick={() => handleAddToCart(product)}>
              Add to cart
            </Button>
          }
        </> : <Spinner />}
    </div>
  )
}

export default ProductCard