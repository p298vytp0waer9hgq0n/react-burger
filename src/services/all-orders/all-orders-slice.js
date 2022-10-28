import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0
}

export const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {
    allOrdersConnect: (state, action) => {
      console.log('all orders connect');
    },
    allOrdersMessage: (state, action) => {
      return action.payload;
    }
  }
})

export default allOrdersSlice.reducer;

export const { allOrdersConnect, allOrdersMessage } = allOrdersSlice.actions;
