import { createSlice } from "@reduxjs/toolkit";
import { ingrTypes } from "../../utils/constants";
import { TConstructorIngredient, TIngredient } from "../../utils/types";

type TBurgerState = {
  bun?: TConstructorIngredient;
  ingredients: Array<TConstructorIngredient>;
}

const initialState: TBurgerState = {
  ingredients: [],
};


export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    burgerAdd: (state, action) => {
      if (action.payload.type === ingrTypes.bun) {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    burgerRemove: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item.uid !== action.payload);
    },
    burgerMove: (state, action) => {
      const oldIndex = state.ingredients.findIndex((item) => item.uid === action.payload.draggedUid);
      const newIndex = state.ingredients.findIndex((item) => item.uid === action.payload.uid);
      state.ingredients.splice(newIndex, 0, state.ingredients.splice(oldIndex, 1)[0]);
    },
    burgerClear: (state, action) => {
      return initialState;
    }
  }
})

export default burgerSlice.reducer;

export const { burgerAdd, burgerRemove, burgerMove, burgerClear } = burgerSlice.actions;
