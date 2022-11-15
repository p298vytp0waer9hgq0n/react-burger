export const socketMiddleware = (url, actions) => (store) => {
  let socket = null;
  return (next) => (action) => {
    const {dispatch} = store;
    const {type, payload} = action;
    const { doConnect, onMessage, onError, doSend, onClose, doClose } = actions;
    if (type === doConnect) {
      socket = new WebSocket(payload ? `${url}?token=${payload}` : url);
    }
    if (socket) {
      if (type === doSend) {
        socket.send(JSON.stringify(payload));
      }
      if (type === doClose) {
        socket.close(1000);
      }
      socket.onmessage = (evt) => {
        if (evt.data) {
          dispatch(onMessage(JSON.parse(evt.data)));
        }
      };
      socket.onerror = (evt) => {
        console.error('Socket Error', evt);
        dispatch(onError());
      };
      socket.onclose = (evt) => {
        dispatch(onClose(evt.code));
      }
    }
    return next(action);
  }
}

