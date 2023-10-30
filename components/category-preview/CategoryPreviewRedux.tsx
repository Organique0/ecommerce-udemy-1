"use client"
import Link from "next/link"
import ProductCard, { Product } from "../product-card/product-card.component"
import "./category-preview.styles.scss"
import { useDispatch, useSelector } from "react-redux"
//saga
import { selectCategoriesMap } from "@/redux-saga-store/categories/category.selector";


//async in server, normal in client
const CategoryPreviewRedux = () => {
    // INFO: You can change the number of products in a preview

    //server side
    //const categoryMap = await getCategoriesAndDocuments() as Record<string, Product[]>;

    const categoryMap = useSelector(selectCategoriesMap);

    return (
        <div className='category-preview-container'>

            {Object.keys(categoryMap).map(title => {
                const products = categoryMap[title];
                return (
                    <div key={title}>
                        <h2>
                            <Link className="title" href={`/shop/${title}`}>{title.toUpperCase()}</Link>
                        </h2>
                        <div className="preview">
                            {products.filter((_: any, index: number) => index < 4).map((product: Product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                );
            })}

        </div>
    )
}

export default CategoryPreviewRedux;
