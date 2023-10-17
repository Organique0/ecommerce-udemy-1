import Link from "next/link"
import ProductCard, { Product } from "../product-card/product-card.component"
import "./category-preview.styles.scss"

const CategoryPreview = ({ title, products }: { title: string, products: Product[] }) => {
    //INFO:You can change the number of products in a preview
    return (
        <div className='category-preview-container'>
            <h2>
                <Link className="title" href={`/shop/${title}`}>{title.toUpperCase()}</Link>
            </h2>
            <div className="preview">
                {
                    products.filter((_, index) => index < 4).map((product: Product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoryPreview