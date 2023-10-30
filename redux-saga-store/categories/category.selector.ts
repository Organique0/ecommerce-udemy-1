import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { DocumentData } from "firebase/firestore";
import { Category, CategoryItem, CategoryState } from "./category.types";

const selectCategoriesData = (state: RootState) => {
    //look, I am a noob. When you cannot fix something just put a bandage on it.
    return state.categories as CategoryState;
};

export const selectCategoriesMap = createSelector(
    [selectCategoriesData],
    (categories) => {
        return categories.categories.reduce((acc: { [x: string]: any }, category: { title: string; items: CategoryItem[] }) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
    }
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesData],
    (categoriesSlice) => categoriesSlice.isLoading
)
