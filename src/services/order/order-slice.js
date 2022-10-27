import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import placeOrder from "../../utils/api/place-order";

export const orderBurger = createAsyncThunk('burger/order', placeOrder);

const initialState = {
  isLoading: true,
  hasError: false,
  placedOrder: {}
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: {
    [orderBurger.pending]: (state, action) => {
      return initialState;
    },
    [orderBurger.fulfilled]: (state, action) => {
      state.placedOrder = action.payload;
      state.isLoading = false;
    },
    [orderBurger.rejected]: (state, action) => {
      console.error(`Ошибка размещения заказа: `, action.error.message);
      state.isLoading = false;
      state.hasError = true;
      state.placedOrder = {};
    }
  }
});

export default orderSlice.reducer;
