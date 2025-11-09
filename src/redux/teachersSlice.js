import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}

const teachersSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        getAllTeachers: (state, action) => {
            state.data = action.payload
        }
    },
});

export const { getAllTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;