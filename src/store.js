import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./services/ingredients/ingredients-slice";
import burgerReducer from "./services/burger/burger-slice";
import orderReducer from "./services/order/order-slice";
import userReducer from "./services/user/user-slice";
import allOrdersReducer from "./services/all-orders/all-orders-slice";
import { socketMiddleware } from "./middleware/socket-middleware";
import { allOrdersUrl } from "./utils/constants";
import { allOrdersActions } from "./services/actions/all-orders";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    order: orderReducer,
    user: userReducer,
    allOrders: allOrdersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(allOrdersUrl, allOrdersActions))
})
