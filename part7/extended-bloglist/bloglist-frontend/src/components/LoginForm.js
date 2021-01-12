import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LoginForm = ({ logInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        logInUser({ username, password });
        setUsername('');
        setPassword('');
    };
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <form className={classes.root} onSubmit={handleLogin}>
                <Typography variant="h5">blog app login</Typography>
                <div>
                    <TextField
                        name="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        label="username"
                        variant="outlined"
                        size="small"
                    />
                </div>
                <div>
                    <TextField
                        name="password"
                        value={password}
                        type="password"
                        onChange={({ target }) => setPassword(target.value)}
                        label="password"
                        variant="outlined"
                        size="small"
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                >
                    login
                </Button>
            </form>
        </Grid>
    );
};

LoginForm.propTypes = {
    logInUser: PropTypes.func.isRequired,
};

export default LoginForm;
