import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import fetchIngredients from '../../utils/api/fetch-ingredients';
import { TIngredient } from "../../utils/types";

type TUserState = {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: TUserState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
}

export const getIngredients = createAsyncThunk('ingredients/getIngredients', fetchIngredients);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getIngredients.fulfilled, (state, action: PayloadAction<{ data: Array<TIngredient> }>) => {
      state.isLoading = false;
      state.ingredients = action.payload.data;
    })
    builder.addCase(getIngredients.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    })
  }
})

export default ingredientsSlice.reducer;
