import { CATEGORIES_INITIAL_STATE, CategoryAction, CATEGORIES_ACTION_TYPES } from "./category.types";

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = <CategoryAction>{}) => {
    const { type, payload } = action;

    switch (type) {
        //without async actions
        /*         case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
                    return { ...state, categories: payload } */
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: payload, isLoading: false };
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return { ...state, error: payload, isLoading: false };
        default:
            return state;
    }
}