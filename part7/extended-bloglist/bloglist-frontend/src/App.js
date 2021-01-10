import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';
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
import UserList from './components/UserList';

const App = () => {
    const [userList, setUserList] = useState([]);

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
        (async () => {
            const users = await userService.getAll();
            setUserList(users);
        })();
    }, [blogs]);
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

    const addComment = async (blogIdAndComment) => {
        try {
            const updatedBlog = await blogService.updateComments(
                blogIdAndComment
            );
            dispatch(updateBlog(updatedBlog));
            notify({
                message: `Added new comment by ${user.name}`,
                type: 'success',
            });
        } catch (expection) {
            console.log(expection);
            notify({ message: expection.response.data.error, type: 'error' });
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
        return (
            <div>
                <Notification notification={notification} />
                <LoginForm logInUser={handleLogin} />
            </div>
        );
    };

    const newBlogForm = () => (
        <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
        </Toggleable>
    );

    return (
        <div>
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <Router>
                        <div>
                            <Link to="/">blogs </Link>
                            <Link to="/users">users </Link>
                            <span>
                                {user.name} is logged in{' '}
                                <button onClick={handleLogout}>logout</button>
                            </span>
                        </div>
                        <h2>blog app</h2>
                        <Notification notification={notification} />
                        <Switch>
                            <Route path="/users">
                                <UserList
                                    users={userList}
                                    handleLikes={updateBlogLikes}
                                    handleDelete={deleteBlog}
                                    handleComment={addComment}
                                />
                            </Route>
                            <Route path="/">
                                {newBlogForm()}
                                <BlogList
                                    blogs={blogs}
                                    handleLikes={updateBlogLikes}
                                    handleDelete={deleteBlog}
                                    handleComment={addComment}
                                />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            )}
        </div>
    );
};

export default App;
