import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from '../../utils/fetch-data';

const initialState = {
  ingredients: [],
  currentIngredient: {},
  isLoading: false,
  hasError: false,
}

export const getIngredients = createAsyncThunk('ingredients/getIngredients', fetchData);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
// в задании зачем-то сказано добавить экшены на добавление и удаление из списка ингредиентов;
// они нигде не используются.
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item._id !== action.payload._id);
    }
  },
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

export const { setCurrentIngredient, addIngredient, removeIngredient } = ingredientsSlice.actions;
