import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  modalOpen: boolean;
}

const initialState: ModalState = {
  modalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
});

export const { setModalOpen } = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
