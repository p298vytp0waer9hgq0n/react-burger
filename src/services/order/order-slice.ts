import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import placeOrder from "../../utils/api/place-order";
import { TOrder } from "../../utils/types";

export const orderBurger = createAsyncThunk('burger/order', placeOrder);

type TOrderState = {
  isLoading: boolean;
  hasError: boolean;
  number: number | null;
}

const initialState: TOrderState = {
  isLoading: true,
  hasError: false,
  number: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, () => {
      return initialState;
    })
    builder.addCase(orderBurger.fulfilled, (state, action: PayloadAction<{ order: TOrder }>) => {
      state.number = action.payload.order.number;
      state.isLoading = false;
    })
    builder.addCase(orderBurger.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.number = null;
    })
  }
});

export default orderSlice.reducer;
