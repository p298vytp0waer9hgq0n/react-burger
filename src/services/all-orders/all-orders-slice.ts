import { createSlice } from "@reduxjs/toolkit"
import { TFeedOrder } from "../../utils/types";

type TAllOrdersState = {
  orders: Array<TFeedOrder>;
  total: number;
  totalToday: number;
  hasError: boolean;
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
    connectAllOrders: (state, action) => {
      state.hasError = false;
    },
    allOrdersMessage: (state, action) => {
      return action.payload;
    },
    sendAllOrders: (state, action) => {
    },
    allOrdersError: (state, action) => {
      state.hasError = true;
    },
    allOrdersClose: (state, action) => {
    },
    closeAllOrders: (state, action) => {
    }
  }
})

export default allOrdersSlice.reducer;

export const { closeAllOrders, connectAllOrders, sendAllOrders, allOrdersMessage, allOrdersError, allOrdersClose } = allOrdersSlice.actions;
