import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unSetNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  if (notification) {
    setTimeout(() => {
      dispatch(unSetNotification());
    }, 5000);
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notification) {
    return <div style={style}>{notification}</div>;
  }
  return null;
};

export default Notification;
