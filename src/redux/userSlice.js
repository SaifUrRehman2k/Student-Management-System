import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
            console.log(state.user);
            localStorage.setItem('currentUser', JSON.stringify(state.user))
        },
        removeUser: (state) => {
            state.user = {}
            localStorage.removeItem('currentUser')
        }
    },
});

export const { getUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
