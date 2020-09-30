import React, { useState } from 'react';

const LoginForm = ({ logInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        logInUser({ username, password });
        setUsername('');
        setPassword('');
    };
    return (
        <form onSubmit={handleLogin}>
            <h2>login</h2>
            <div>
                username:
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password:
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );
};

export default LoginForm;
