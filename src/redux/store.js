import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import toastReducer from './toastSlice.js'
import loaderReducer from './loaderSlice.js'
import studentsReducer from './studentsSlice.js'
import modalReducer from './modalSlice.js'
import teachersReducer from './teachersSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer,
        loader: loaderReducer,
        studentsData: studentsReducer,
        modal: modalReducer,
        teachersData: teachersReducer
    },
});
