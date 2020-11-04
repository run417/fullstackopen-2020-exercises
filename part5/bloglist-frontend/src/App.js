import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    const blogFormRef = useRef();

    const sortBlogs = (blogs) => {
        blogs.sort((a, b) => {
            if (a.likes === b.likes) return 0;
            if (a.likes > b.likes) return -1;
            return 1;
        });
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll();
            sortBlogs(blogs);
            setBlogs(blogs);
            console.log(blogs);
        };
        fetchBlogs();
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

    const addBlog = async (blogObject) => {
        try {
            const savedBlog = await blogService.create(blogObject);
            setBlogs(blogs.concat(savedBlog));
            notify({
                message: `a new blog ${savedBlog.title} added`,
                type: 'success',
            });
            blogFormRef.current.toggleVisibility();
        } catch (exception) {
            notify({ message: exception.response.data.error, type: 'error' });
        }
    };

    const updateBlogLikes = async (blogObject) => {
        try {
            const updatedBlog = await blogService.update(blogObject);
            const updatedCollection = blogs.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            );
            console.log(updatedCollection);
            sortBlogs(updatedCollection);
            setBlogs(updatedCollection);
            notify({
                message: `${user.name} liked ${updatedBlog.title}`,
                type: 'success',
            });
        } catch (exception) {
            console.log(exception);
        }
    };

    const deleteBlog = async (blog) => {
        try {
            await blogService.remove(blog);
            const updatedCollection = blogs.filter((b) => b.id !== blog.id);
            sortBlogs(updatedCollection);
            setBlogs(updatedCollection);
            notify({
                message: `Removed blog ${blog.title} by ${blog.author}`,
                type: 'success',
            });
        } catch (exception) {
            console.log(exception);
        }
    };

    const handleLogin = async (credentials) => {
        try {
            const user = await loginService.login(credentials);
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
            setUser(user);
            blogService.setToken(user.token);
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

    const loginForm = () => {
        return <LoginForm logInUser={handleLogin} />;
    };

    const blogList = () => (
        <div className="blogList">
            <h2>list</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlogLikes={updateBlogLikes}
                    deleteBlog={deleteBlog}
                    loggedInUser={user}
                />
            ))}
        </div>
    );

    const newBlogForm = () => (
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
        </Toggleable>
    );

    return (
        <div>
            <Notification notification={notification} />
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <h2>blogs</h2>
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
