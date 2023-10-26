"use client"
import { Product } from "@/components/product-card/product-card.component";
import { getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import "./shop.styles.scss";
import CategoryPreview from "@/components/category-preview/CategoryPreview";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesAsync, setCategories } from "@/store/categories/category.action";
import CategoryPreviewRedux from "@/components/category-preview/CategoryPreviewRedux";

export interface Category {
    name: string;
    products: Product[];
}

const ShopPage = () => {
    //works with or without Redux

    //no redux
    //const categoryMap = await getCategoriesAndDocuments() as Record<string, Product[]>;
    const dispatch = useDispatch();

    useEffect(() => {
        //without redux thunk async actions
        /*         const getCategoriesMap = async () => {
                    const categoriesArray = await getCategoriesAndDocumentsContext();
                    dispatch(setCategories(categoriesArray));
                };
                getCategoriesMap(); */

        //@ts-ignore will probably get fixed later
        dispatch(fetchCategoriesAsync());
    }, []);
    return (
        <>
            {//no redux
            /* {
                Object.keys(categoryMap).map(title => {
                    const products = categoryMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )
                })
            } */}
            <CategoryPreviewRedux />
        </>
    )
}

export default ShopPage;