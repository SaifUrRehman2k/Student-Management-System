import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.value = 1
        },
        stopLoading: (state) => {
            state.value = null
        }
    },
});

export const { startLoading, stopLoading} = loaderSlice.actions;
export default loaderSlice.reducer;
