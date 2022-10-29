import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  orders: [],
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersConnect: (state, action) => {
      console.log('orders connect');
    },
    ordersMessage: (state, action) => {
      return action.payload;
    }
  }
})

export default ordersSlice.reducer;

export const { ordersConnect, ordersMessage } = ordersSlice.actions;
