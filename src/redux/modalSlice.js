import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: null,
    modalName: null
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal: (state, action)=> {
            state.display = 1
            state.modalName = action.payload
        },
        hideModal: (state) => {
            state.display = null
        }
    },
});

export const { hideModal, showModal } = modalSlice.actions;
export default modalSlice.reducer;
