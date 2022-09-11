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
        const uid = new Date().getTime() + state.components.length;
        state.components.push({ uid, ...action.payload });
      }
    },
    burgerRemove: (state, action) => {
      state.components = state.components.filter((item) => item.uid !== action.payload);
    },
    burgerMove: (state, action) => {
      const oldIndex = state.components.findIndex((item) => item.uid === action.payload.draggedUid);
      const newIndex = state.components.findIndex((item) => item.uid === action.payload.uid);
      state.components.splice(newIndex, 0, state.components.splice(oldIndex, 1)[0]);
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

export const { burgerAdd, burgerRemove, burgerMove } = burgerSlice.actions;
