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
    error: any;
}

interface SetCategoriesMapAction {
    type: string;
    payload: Record<string, CategoryItem[]> | Object;
}

export type CategoryAction = SetCategoriesMapAction;


export const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES: "category/SET_CATEGORIES_MAP",
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: [],
    error: null,
}
