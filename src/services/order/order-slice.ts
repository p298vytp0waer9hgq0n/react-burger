import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import placeOrder from "../../utils/api/place-order";

export const orderBurger = createAsyncThunk('burger/order', placeOrder);

type TOrderState = {
  isLoading: boolean;
  hasError: boolean;
  /* placedOrder: {
    success: boolean;
    name: string;
    order: {
      number: number;
    }
  } */
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
    builder.addCase(orderBurger.pending, (state, action) => {
      return initialState;
    })
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.number = action.payload.order.number;
      state.isLoading = false;
    })
    builder.addCase(orderBurger.rejected, (state, action) => {
      console.error(`Ошибка размещения заказа: `, action.error.message);
      state.isLoading = false;
      state.hasError = true;
      state.number = null;
    })
  }
});

export default orderSlice.reducer;
