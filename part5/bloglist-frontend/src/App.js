import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.dir(exception.response.data.error);
            alert('Wrong crendentials');
        }
    };

    const loginForm = () => (
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

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            <p>{user.name} is logged in</p>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );

    return <div>{user === null ? loginForm() : blogList()}</div>;
};

export default App;
