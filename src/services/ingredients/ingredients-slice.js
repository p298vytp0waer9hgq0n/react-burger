import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchIngredients from '../../utils/fetch-ingredients';

const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
}

export const getIngredients = createAsyncThunk('ingredients/getIngredients', fetchIngredients);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.isLoading = true;
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload.data;
    },
    [getIngredients.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
})

export default ingredientsSlice.reducer;

export const { setCurrentIngredient } = ingredientsSlice.actions;
