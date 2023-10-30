//"use client"
import { Product } from "@/components/product-card/product-card.component";
import "./shop.styles.scss";
import CategoryPreview from "@/components/category-preview/CategoryPreview";
import CategoryPreviewRedux from "@/components/category-preview/CategoryPreviewRedux";

export interface Category {
    name: string;
    products: Product[];
}

const ShopPage = () => {
    //works with or without Redux

    return (

        //no redux, server side
        //<CategoryPreview />
        //redux
        <CategoryPreviewRedux />

    )
}

export default ShopPage;