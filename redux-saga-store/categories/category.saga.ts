import { takeLatest, all, call, put } from "typed-redux-saga";
import { getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocumentsContext);
        yield* put(fetchCategoriesSuccess(categoriesArray))
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    //hey, run everything inside and only complete when everything is done (everything in this all function)
    yield* all([call(onFetchCategories)])
}