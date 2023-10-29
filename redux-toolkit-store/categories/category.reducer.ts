import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES_INITIAL_STATE } from "./category.types";

export const categorySlice = createSlice({
    name: "categories",
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        }
    }
});

export const { setCategories } = categorySlice.actions;
export const categoriesReducer = categorySlice.reducer;