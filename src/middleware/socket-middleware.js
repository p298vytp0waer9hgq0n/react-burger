export const socketMiddleware = (url, actions) => (store) => {
  let socket = null;
  return (next) => (action) => {
    const {dispatch, getState} = store;
    const {type, payload} = action;
    const { onConnect, onMessage } = actions;
    if (type === onConnect) {
      console.log(onMessage);
      socket = new WebSocket(url);
    }
    if (socket) {
      socket.onopen = (evt) => {
        console.log('soket opened');
      }
      socket.onmessage = (evt) => {
        if (evt.data) {
          dispatch(onMessage(JSON.parse(evt.data)));
        }
      }
    }
    return next(action);
  }
}

