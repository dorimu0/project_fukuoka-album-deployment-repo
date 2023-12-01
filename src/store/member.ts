import { createSlice } from "@reduxjs/toolkit";
import { Member } from "../types/member.interface";

const initialState: Member = {
  position: "",
  id: 0,
  imageUrl: "",
  name: "",
};

const memberSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMember: (state, action) => {
      const { id, name, position, imageUrl } = action.payload;
      state.id = id;
      state.name = name;
      state.position = position;
      state.imageUrl = imageUrl;
    },
    clearMember: (state) => {
      state.id = 0;
      state.name = "";
      state.position = "";
      state.imageUrl = "";
    },
  },
});

export const { setMember, clearMember } = memberSlice.actions;
