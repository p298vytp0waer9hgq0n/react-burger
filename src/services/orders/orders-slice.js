import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  orders: [],
  hasError: false
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    connectOrders: (state, action) => {
      state.hasError = false;
    },
    ordersMessage: (state, action) => {
      return action.payload;
    },
    sendOrders: (state, action) => {
    },
    ordersError: (state, action) => {
      state.hasError = true;
    },
    ordersClose: (state, action) => {
    },
    closeOrders: (state, action) => {
    }
  }
})

export default ordersSlice.reducer;

export const { connectOrders, ordersMessage, ordersClose, ordersError, sendOrders, closeOrders } = ordersSlice.actions;
