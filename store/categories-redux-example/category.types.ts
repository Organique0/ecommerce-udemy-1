import { Product } from "@/components/product-card/product-card.component";

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
}

interface SetCategoriesMapAction {
    type: typeof CATEGORIES_ACTION_TYPES.SET_CATEGORIES;
    payload: Record<string, Product[]> | Object;
}

export type CategoryAction = SetCategoriesMapAction;


export const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES: "SET_CATEGORIES_MAP",
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: []
}
