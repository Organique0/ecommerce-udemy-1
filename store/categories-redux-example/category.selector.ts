import { createSelector } from "reselect";
import { RootState } from "../root-reducer";

const selectCategoriesData = (state: RootState) => {
    console.log(state)
    return state.categories
};

export const selectCategoriesMap = createSelector(
    [selectCategoriesData],
    (categories) => {
        console.log(categories);
        //@ts-ignore look, I am a noob
        return categories.categories.reduce((acc: { [x: string]: any }, category: { title: any; items: any }) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
    }
);
