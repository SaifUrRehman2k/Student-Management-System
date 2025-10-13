import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    userType: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.userType = action.payload.userType;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.userType = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
