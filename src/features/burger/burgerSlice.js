import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import placeOrder from "../../utils/place-order";

const initialState = {
  bun: {},
  components: [],
  placedOrder: {}
};

export const orderBurger = createAsyncThunk('burger/order', placeOrder);

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    burgerAdd: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.components.push(action.payload);
      }
    },
    burgerRemove: (state, action) => {
      state.components.splice(action.payload, 1);
    }
  },
  extraReducers: {
    [orderBurger.fulfilled]: (state, action) => {
      state.placedOrder = action.payload;
    },
    [orderBurger.rejected]: (state, action) => {
      console.log(`Ошибка размещения заказа: `, action.error.message);
    }
  }
})

export default burgerSlice.reducer;

export const { burgerAdd, burgerRemove } = burgerSlice.actions;
