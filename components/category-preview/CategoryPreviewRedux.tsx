//"use client"
import Link from "next/link"
import ProductCard, { Product } from "../product-card/product-card.component"
import "./category-preview.styles.scss"
import { useSelector } from "react-redux"
import { selectCategoriesMap } from "@/store/categories/category.selector"
import { getCategoriesAndDocuments } from "@/utils/firebase/firebase.utils"

const CategoryPreviewRedux = async () => {
    // INFO: You can change the number of products in a preview

    //client side:
    //redux
    //const categoryMap = useSelector(selectCategoriesMap)

    //server side:
    const categoryMap = await getCategoriesAndDocuments() as Record<string, Product[]>;

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
