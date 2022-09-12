import { createSlice } from "@reduxjs/toolkit";
import { ingTypes } from "../../utils/constants";

const initialState = {
  bun: {},
  ingredients: [],
};


export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    burgerAdd: (state, action) => {
      if (action.payload.type === ingTypes.bun) {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    burgerRemove: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.uid !== action.payload);
    },
    burgerMove: (state, action) => {
      const oldIndex = state.ingredients.findIndex((item) => item.uid === action.payload.draggedUid);
      const newIndex = state.ingredients.findIndex((item) => item.uid === action.payload.uid);
      state.ingredients.splice(newIndex, 0, state.ingredients.splice(oldIndex, 1)[0]);
    }
  }
})

export default burgerSlice.reducer;

export const { burgerAdd, burgerRemove, burgerMove } = burgerSlice.actions;
