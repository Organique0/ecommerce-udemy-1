"use client"
import { getCategoriesAndDocuments } from "@/utils/firebase/firebase.utils";
import ProductCard, { Product } from "@/components/product-card/product-card.component";
import "./category.styles.scss"
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "@/redux-saga-store/categories/category.selector";
import { ProductWithQuantity } from "@/redux-saga-store/cart/cart.types";
interface CategoryPageProps {
    params: {
        category: string
    }
}
//async in server, normal in client
const CategoryPage = ({ params }: CategoryPageProps) => {
    const { category } = params;
    //server side
    //const categoryMap = await getCategoriesAndDocuments() as Record<string, Product[]>;

    //redux saga
    const categoryMap = useSelector(selectCategoriesMap);

    return (
        <>
            <h1>{category}</h1>
            <div className="category-container">
                {
                    categoryMap[category]?.map((product: ProductWithQuantity) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </>
    )
}

export default CategoryPage