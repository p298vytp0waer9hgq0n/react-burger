import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import placeOrder from "../../utils/place-order";

const initialState = {
  bun: {},
  ingredients: [],
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
        const uid = new Date().getTime() - state.ingredients.length;
        state.ingredients.push({ uid, ...action.payload });
      }
    },
    burgerRemove: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.uid !== action.payload);
    },
    burgerMove: (state, action) => {
      const oldIndex = state.ingredients.findIndex((item) => item.uid === action.payload.draggedUid);
      const newIndex = state.ingredients.findIndex((item) => item.uid === action.payload.uid);
      state.ingredients.splice(newIndex, 0, state.ingredients.splice(oldIndex, 1)[0]);
    }
  },
  extraReducers: {
    [orderBurger.fulfilled]: (state, action) => {
      state.placedOrder = action.payload;
    },
    [orderBurger.rejected]: (state, action) => {
      console.log(`Ошибка размещения заказа: `, action.error.message);
      state.placedOrder = {};
    }
  }
})

export default burgerSlice.reducer;

export const { burgerAdd, burgerRemove, burgerMove } = burgerSlice.actions;
