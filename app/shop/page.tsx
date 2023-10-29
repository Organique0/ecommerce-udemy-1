//"use client"
import { Product } from "@/components/product-card/product-card.component";
import { getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import "./shop.styles.scss";
import CategoryPreview from "@/components/category-preview/CategoryPreview";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesStart, setCategories } from "@/store/categories/category.action";
import CategoryPreviewRedux from "@/components/category-preview/CategoryPreviewRedux";

export interface Category {
    name: string;
    products: Product[];
}

const ShopPage = () => {
    //works with or without Redux
    //redux, thunk and saga are in ReduxProvider

    return (

        //no redux, server side
        <CategoryPreview />
        //redux
        //<CategoryPreviewRedux />

    )
}

export default ShopPage;