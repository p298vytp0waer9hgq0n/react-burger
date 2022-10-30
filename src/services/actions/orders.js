import { ordersClose, ordersError, ordersMessage } from "../orders/orders-slice";

export const ordersActions = {
  doConnect: 'orders/connectOrders',
  onMessage: ordersMessage,
  onError: ordersError,
  doSend: 'orders/sendOrders',
  onClose: ordersClose,
  doClose: 'orders/closeOrders'
}
