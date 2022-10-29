export const socketMiddleware = (url, actions) => (store) => {
  let socket = null;
  return (next) => (action) => {
    const {dispatch} = store;
    const {type, payload} = action;
    const { onConnect, onMessage } = actions;
    if (type === onConnect) {
      socket = new WebSocket(payload ? `${url}?token=${payload}` : url);
    }
    if (socket) {
      socket.onmessage = (evt) => {
        if (evt.data) {
          dispatch(onMessage(JSON.parse(evt.data)));
        }
      }
    }
    return next(action);
  }
}

