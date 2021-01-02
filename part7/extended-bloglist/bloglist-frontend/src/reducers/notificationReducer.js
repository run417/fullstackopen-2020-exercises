const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'UNSET':
            return null;
        default:
            return state;
    }
};

export const setNotification = (notification) => {
    // notification = {message, timeoutId = null}
    return {
        type: 'SET',
        data: { ...notification },
    };
};

export const removeNotification = () => {
    return {
        type: 'UNSET',
    };
};

export default notificationReducer;
