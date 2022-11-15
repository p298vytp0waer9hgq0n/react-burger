import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TFeedOrder, TOrdersResponse } from "../../utils/types";

type TAllOrdersState = {
  orders: Array<TFeedOrder>;
  total: number;
  totalToday: number;
  hasError?: boolean;
}

const initialState: TAllOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  hasError: false
}

export const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {
    connectAllOrders: (state) => {
      state.hasError = false;
    },
    allOrdersMessage: (state, action: PayloadAction<TOrdersResponse>) => {
      return action.payload;
    },
    sendAllOrders: () => {
    },
    allOrdersError: (state) => {
      state.hasError = true;
    },
    allOrdersClose: () => {
    },
    closeAllOrders: () => {
    }
  }
})

export default allOrdersSlice.reducer;

export const { closeAllOrders, connectAllOrders, sendAllOrders, allOrdersMessage, allOrdersError, allOrdersClose } = allOrdersSlice.actions;
