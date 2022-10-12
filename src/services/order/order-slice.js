import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import placeOrder from "../../utils/place-order";

export const orderBurger = createAsyncThunk('burger/order', placeOrder);

const initialState = {
  placedOrder: {}
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: {
    [orderBurger.fulfilled]: (state, action) => {
      state.placedOrder = action.payload;
    },
    [orderBurger.rejected]: (state, action) => {
      console.error(`Ошибка размещения заказа: `, action.error.message);
      state.placedOrder = {};
    }
  }
});

export default orderSlice.reducer;
