import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const Notification = ({ notification }) => {
    if (notification === null) return notification;
    return (
        <div className={`${notification.type}-notification`}>
            {notification.message}
        </div>
    );
};

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedBlogUserJson = window.localStorage.getItem(
            'loggedBlogUser'
        );
        if (loggedBlogUserJson) {
            const user = JSON.parse(loggedBlogUserJson);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const notify = (notification) => {
        setNotification(notification);
        setTimeout(() => setNotification(null), 5000);
    };

    const addBlog = async (event) => {
        event.preventDefault();
        try {
            const savedBlog = await blogService.create({ title, author, url });
            setBlogs(blogs.concat(savedBlog));
            setTitle('');
            setAuthor('');
            setUrl('');
            notify({
                message: `a new blog ${savedBlog.title} added`,
                type: 'success',
            });
        } catch (exception) {
            notify({ message: exception.response.data.error, type: 'error' });
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
            setUser(user);
            blogService.setToken(user.token);
            setUsername('');
            setPassword('');
            notify({ message: 'Login successful', type: 'success' });
        } catch (exception) {
            notify({ message: exception.response.data.error, type: 'error' });
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser');
        setUser(null);
        blogService.setToken(null);
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>login</h2>
            <Notification notification={notification} />
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
            <h2>list</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );

    const newBlogForm = () => (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        name="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );

    return (
        <div>
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <h2>blogs</h2>
                    <Notification notification={notification} />
                    <p>
                        {user.name} is logged in{' '}
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    {newBlogForm()}
                    {blogList()}
                </div>
            )}
        </div>
    );
};

export default App;
