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
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

    const drawerWidth = 200;

    const useStyles = makeStyles((theme) => {
        console.log(theme);
        return {
            root: {
                display: 'flex',
            },
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
            },
            drawerPaper: {
                width: drawerWidth,
            },
            drawerContainer: {
                overflow: 'auto',
            },
            content: {
                flexGrow: 1,
                padding: theme.spacing(2),
            },
        };
    });
    const classes = useStyles();

    return (
        <div>
            {user === null ? (
                loginForm()
            ) : (
                <Router>
                    <div className={classes.root}>
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="h5">
                                            Blog App
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right">
                                            {user.name} is logged in{' '}
                                            <Button
                                                color="inherit"
                                                component="button"
                                                onClick={handleLogout}
                                            >
                                                logout
                                            </Button>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </AppBar>

                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <Toolbar />
                            <div className={classes.drawerContainer}>
                                <List>
                                    <ListItem button>
                                        <Link to="/">
                                            <ListItemText primary="Blogs" />
                                        </Link>
                                    </ListItem>
                                    <ListItem button>
                                        <Link to="/users">
                                            <ListItemText primary="Users" />
                                        </Link>
                                    </ListItem>
                                </List>
                                <Divider />
                            </div>
                        </Drawer>
                        <div className={classes.content}>
                            <Toolbar />
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
                                    <Toolbar variant="dense" />
                                    <BlogList
                                        blogs={blogs}
                                        handleLikes={updateBlogLikes}
                                        handleDelete={deleteBlog}
                                        handleComment={addComment}
                                    />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            )}
        </div>
    );
};

export default App;
