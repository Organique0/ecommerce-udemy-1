
export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};

export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
};

export interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    error: any;
}

interface SetCategoriesMapAction {
    type: string;
    payload: Record<string, CategoryItem[]> | Object;
}

export type CategoryAction = SetCategoriesMapAction;


export const CATEGORIES_ACTION_TYPES = {
    FETCH_CATEGORIES_START: "category/FETCH_CATEGORIES_START",
    FETCH_CATEGORIES_SUCCESS: "category/FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_FAILED: "category/FETCH_CATEGORIES_FAILED",
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null,
}
