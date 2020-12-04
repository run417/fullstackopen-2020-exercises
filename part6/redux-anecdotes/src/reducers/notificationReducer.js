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

export const setNotification = (notification) => {
  return {
    type: "SET",
    data: notification,
  };
};

export const unSetNotification = () => {
  return {
    type: "UNSET",
  };
};

export default notificationReducer;
