import React from 'react';

const Notification = ({ notification }) => {
    if (notification === null) return notification;
    return (
        <div className={`${notification.type}-notification`}>
            {notification.message}
        </div>
    );
};

export default Notification;
