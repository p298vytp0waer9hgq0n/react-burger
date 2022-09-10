import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./features/ingredients/ingredientsSlice";
import burgerReducer from "./features/burger/burgerSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burger: burgerReducer
  }
})
