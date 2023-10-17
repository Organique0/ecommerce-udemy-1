import { getCategoriesAndDocuments } from "@/app/utils/firebase/firebase.utils";
import ProductCard, { Product } from "@/components/product-card/product-card.component";
import "./category.styles.scss"
interface CategoryPageProps {
    params: {
        category: string
    }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { category } = params;
    const categoryMap = await getCategoriesAndDocuments() as Record<string, Product[]>;

    return (
        <>
            <h1>{category}</h1>
            <div className="category-container">
                {
                    categoryMap[category]?.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </>
    )
}

export default CategoryPage