import { Button } from '@material-ui/core';
import React, { useState, useImperativeHandle } from 'react';

const Toggleable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return { toggleVisibility };
    });

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={toggleVisibility}
                >
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={toggleVisibility}
                >
                    cancel
                </Button>
            </div>
        </div>
    );
});

Toggleable.displayName = 'Toggleable';

export default Toggleable;
