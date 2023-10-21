import ProductCard, { Product } from "@/components/product-card/product-card.component";
import { getCategoriesAndDocuments } from "@/utils/firebase/firebase.utils";
import "./shop.styles.scss";
import CategoryPreview from "@/components/category-preview/CategoryPreview";

export interface Category {
    name: string;
    products: Product[];
}

const ShopPage = async () => {
    const categoryMap = await getCategoriesAndDocuments() as Record<string, Product[]>;
    return (
        <>
            {
                Object.keys(categoryMap).map(title => {
                    const products = categoryMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )
                })
            }
        </>
    )
}

export default ShopPage;
