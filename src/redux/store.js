import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import toastReducer from './toastSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer
    },
});
