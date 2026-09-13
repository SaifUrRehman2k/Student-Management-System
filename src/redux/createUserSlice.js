import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    role: null
};

const createuserSlice = createSlice({
    name: "createUser",
    initialState,
    reducers: {
        getNewUser: (state, action)=> {
            state.data = action.payload
        }
    },
});

export const { getNewUser } = createuserSlice.actions;
export default createuserSlice.reducer;
