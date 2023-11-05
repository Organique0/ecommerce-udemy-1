import Link from "next/link"
import ProductCard from "../product-card/product-card.component"
import "./category-preview.styles.scss"
import { getCategoriesAndDocuments } from "@/utils/firebase/firebase.utils";
import { CategoryItem } from "@/redux-saga-store/categories/category.types";

const CategoryPreview = async () => {
    //INFO:You can change the number of products in a preview
    //no redux, serverside

    const categoryMap = await getCategoriesAndDocuments();
    return (
        Object.keys(categoryMap).map(title => {
            const products = categoryMap[title];
            return (
                <div className='category-preview-container'>
                    <h2>
                        <Link className="title" href={`/shop/${title}`}>{title.toUpperCase()}</Link>
                    </h2>
                    <div className="preview">
                        {
                            products.filter((_, index) => index < 4).map((product: CategoryItem) => {
                                return (
                                    <ProductCard key={product.id} product={product} />
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    )
}

export default CategoryPreview