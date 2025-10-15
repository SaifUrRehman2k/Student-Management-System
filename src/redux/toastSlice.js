import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        createToast: (state, action) => {
            state.value = action.payload
        },
        removeToast: (state) => {
            state.value = null
        }
    },
});

export const { createToast, removeToast} = toastSlice.actions;
export default toastSlice.reducer;
