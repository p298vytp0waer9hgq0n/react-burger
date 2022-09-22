import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientModal: {}
}
export const ingredientModalSlice = createSlice({
  name: 'ingredientModal',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.ingredientModal = action.payload;
    }
  }
})

export default ingredientModalSlice.reducer;
export const { setCurrentIngredient } = ingredientModalSlice.actions;
