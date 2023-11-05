import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { DocumentData } from "firebase/firestore";
import { Category, CategoryItem, CategoryMap } from "./category.types";
import { CategoryState } from "./category.reducer";

const selectCategoriesData = (state: RootState): CategoryState => {
    return state.categories;
};

export const selectCategoriesMap = createSelector(
    [selectCategoriesData],
    (categories): CategoryMap => {
        return categories.categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap);
    }
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesData],
    (categoriesSlice) => categoriesSlice.isLoading
)
