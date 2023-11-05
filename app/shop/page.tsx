//"use client"
import "./shop.styles.scss";
import CategoryPreview from "@/components/category-preview/CategoryPreview";
import CategoryPreviewRedux from "@/components/category-preview/CategoryPreviewRedux";



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