import { createAction } from "@/utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { DocumentData } from "firebase/firestore";

export const setCategories = (categoriesArray: DocumentData[]) => {
    return (
        createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
    )
}
