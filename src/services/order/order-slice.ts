import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import placeOrder from "../../utils/api/place-order";

export const orderBurger = createAsyncThunk('burger/order', placeOrder);

type TOrderState = {
  isLoading: boolean;
  hasError: boolean;
  placedOrder: any;
}

const initialState = {
  isLoading: true,
  hasError: false,
  placedOrder: {}
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state, action) => {
      return initialState;
    })
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.placedOrder = action.payload;
      state.isLoading = false;
    })
    builder.addCase(orderBurger.rejected, (state, action) => {
      console.error(`Ошибка размещения заказа: `, action.error.message);
      state.isLoading = false;
      state.hasError = true;
      state.placedOrder = {};
    })
  }
});

export default orderSlice.reducer;
