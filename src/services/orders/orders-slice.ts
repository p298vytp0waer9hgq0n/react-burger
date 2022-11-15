import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TFeedOrder, TOrdersResponse } from "../../utils/types"

type TOrdersState = {
  orders: Array<TFeedOrder>;
  hasError?: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  hasError: false
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    connectOrders: (state, action: PayloadAction<string>) => {
      state.hasError = false;
    },
    ordersMessage: (state, action: PayloadAction<TOrdersResponse>) => {
      return action.payload;
    },
    sendOrders: () => {
    },
    ordersError: (state) => {
      state.hasError = true;
    },
    ordersClose: () => {
    },
    closeOrders: () => {
    }
  }
})

export default ordersSlice.reducer;

export const { connectOrders, ordersMessage, ordersClose, ordersError, sendOrders, closeOrders } = ordersSlice.actions;
