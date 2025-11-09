import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
}

const studentsSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        getAllStudents: (state, action) => {
            state.data = action.payload
        }
    },
});

export const { getAllStudents } = studentsSlice.actions;
export default studentsSlice.reducer;