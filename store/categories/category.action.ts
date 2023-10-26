import createAction from "@/utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { DocumentData } from "firebase/firestore";
import { getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import { Dispatch } from "redux";


//without async actions
export const setCategories = (categoriesArray: DocumentData[]) => {
    return (
        createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
    )
}
//async actions
export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray: DocumentData[]) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesError = (error: any) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

//"clean separation of logic". "Action driven arhitecture".
export const fetchCategoriesAsync = () => async (dispatch: Dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocumentsContext();
        fetchCategoriesSuccess(categoriesArray);
    } catch (error: any) {
        dispatch(fetchCategoriesError(error));
    }

}