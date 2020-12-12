const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET":
      return action.data;
    case "UNSET":
      return null;
    default:
      return state;
  }
};

export const setNotification = (notification, timeout = 5) => {
  return (dispatch) => {
    dispatch({ type: "SET", data: notification });
    setTimeout(() => {
      dispatch({ type: "UNSET" });
    }, timeout * 1000);
  };
};

export default notificationReducer;
