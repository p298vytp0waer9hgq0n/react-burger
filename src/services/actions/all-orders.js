import { allOrdersClose, allOrdersError, allOrdersMessage } from "../all-orders/all-orders-slice";

export const allOrdersActions = {
  doConnect: 'allOrders/connectAllOrders',
  onMessage: allOrdersMessage,
  onError: allOrdersError,
  doSend: 'allOrders/sendAllOrders',
  onClose: allOrdersClose,
  doClose: 'allOrders/closeAllOrders'
}
