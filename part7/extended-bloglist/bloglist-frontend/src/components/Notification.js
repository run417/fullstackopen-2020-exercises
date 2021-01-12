import React from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Notification = ({ notification }) => {
    if (notification === null) return notification;
    return (
        // <div className={`${notification.type}-notification`}>
        //     {notification.message}
        // </div>

        <Alert severity={`${notification.type}`}>{notification.message}</Alert>
    );
};

export default Notification;
