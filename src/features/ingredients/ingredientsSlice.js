import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from '../../utils/fetch-data';
import generateTestBurger from "../../utils/test-burger";

const initialState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
}

export const getIngredients = createAsyncThunk('ingredients/getIngredients', fetchData);

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
      generateTestBurger(action.payload.data);
    },
    [getIngredients.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    }
  }
})

export default ingredientsSlice.reducer;
