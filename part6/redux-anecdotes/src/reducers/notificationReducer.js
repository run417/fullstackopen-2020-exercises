const notificationReducer = (
  state = { message: undefined, timeOutId: undefined },
  action
) => {
  switch (action.type) {
    case "SET":
      return action.data;
    case "UNSET":
      return { message: undefined, timeOutId: undefined };
    default:
      return state;
  }
};

export const setNotification = (notification, timeout = 5) => {
  return (dispatch) => {
    if (notification.timeOutId) {
      clearTimeout(notification.timeOutId);
    }
    const timeOutId = setTimeout(() => {
      dispatch({ type: "UNSET" });
    }, timeout * 1000);
    dispatch({ type: "SET", data: { ...notification, timeOutId } });
  };
};

export default notificationReducer;
