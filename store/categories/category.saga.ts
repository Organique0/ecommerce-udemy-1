import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocumentsContext } from "@/utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesError } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

//saga
export function* fetchCategoriesAsync() {
    try {
        //@ts-ignore FIXME: types
        const categoriesArray = yield call(getCategoriesAndDocumentsContext);
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch (error: any) {
        yield put(fetchCategoriesError(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    //hey, run everything inside and only complete when everything is done (everything in this all function)
    yield all([call(onFetchCategories)])
}