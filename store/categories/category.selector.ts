import { createSelector } from "reselect";
import { RootState } from "../root-reducer";
import { DocumentData } from "firebase/firestore";
import { Category, CategoryItem } from "./category.types";

const selectCategoriesData = (state: RootState) => {
    //@ts-ignore look, I am a noob
    return state.categories.categories;
};

export const selectCategoriesMap = createSelector(
    [selectCategoriesData],
    (categories) => {
        return categories.reduce((acc: { [x: string]: any }, category: { title: string; items: CategoryItem[] }) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
    }
);
