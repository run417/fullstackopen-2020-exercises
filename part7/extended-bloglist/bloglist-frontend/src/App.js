import React, { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
    initializeBlogs,
    saveBlog,
    updateBlog,
    deleteBlogFromState,
} from './reducers/blogReducer';
import {
    removeNotification,
    setNotification,
} from './reducers/notificationReducer';
import { removeUser, setUser } from './reducers/userReducer';

const App = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const notification = useSelector((state) => state.notification);
    const blogs = useSelector((state) => {
        const blogs = state.blogs;
        blogs.sort((a, b) => {
            if (a.likes === b.likes) return 0;
            if (a.likes > b.likes) return -1;
            return 1;
        });
        return blogs;
    });

    const blogFormRef = useRef();

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll();
            dispatch(initializeBlogs(blogs));
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const loggedBlogUserJson = window.localStorage.getItem(
            'loggedBlogUser'
        );
        if (loggedBlogUserJson) {
            const user = JSON.parse(loggedBlogUserJson);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, []);

    const notify = (messageAndType) => {
        // clear existing timeout and replace it with a new one
        if (notification !== null) {
            clearTimeout(notification.timeoutId);
        }
        const timeoutId = setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
        dispatch(setNotification({ ...messageAndType, timeoutId }));
    };

    const addBlog = async (blogObject) => {
        try {
            const savedBlog = await blogService.create(blogObject);
            dispatch(saveBlog(savedBlog));
            notify({
                message: `a new blog ${savedBlog.title} added`,
                type: 'success',
            });
            blogFormRef.current.toggleVisibility();
        } catch (exception) {
            console.log('exception occured', exception);
            notify({ message: exception.response.data.error, type: 'error' });
        }
    };

    const updateBlogLikes = async (blogObject) => {
        try {
            // updated blog runs twice to increase responsiveness
            dispatch(updateBlog(blogObject));
            const updatedBlog = await blogService.update(blogObject);
            // redux state is updated the second time to reflect the actual update from server.
            dispatch(updateBlog(updatedBlog));
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
            dispatch(deleteBlogFromState(blog));
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
            dispatch(setUser(user));
            blogService.setToken(user.token);
            notify({ message: 'Login successful', type: 'success' });
        } catch (exception) {
            notify({ message: exception.response.data.error, type: 'error' });
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogUser');
        dispatch(removeUser());
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
