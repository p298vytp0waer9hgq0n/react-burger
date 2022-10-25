import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./services/ingredients/ingredients-slice";
import burgerReducer from "./services/burger/burger-slice";
import orderReducer from "./services/order/order-slice";
import userReducer from "./services/user/user-slice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    order: orderReducer,
    user: userReducer
  }
})
