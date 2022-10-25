import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import placeOrder from "../../utils/api/place-order";

export const orderBurger = createAsyncThunk('burger/order', placeOrder);

const initialState = {
  isLoading: false,
  hasError: false,
  placedOrder: {}
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: {
    [orderBurger.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
      state.placeOrder = {};
    },
    [orderBurger.fulfilled]: (state, action) => {
      state.placedOrder = action.payload;
      state.isLoading = false;
    },
    [orderBurger.rejected]: (state, action) => {
      console.error(`Ошибка размещения заказа: `, action.error.message);
      state.hasError = true;
      state.placedOrder = {};
    }
  }
});

export default orderSlice.reducer;
