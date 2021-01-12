import {
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Blog from './Blog';

const BlogList = ({ blogs, handleLikes, handleDelete, handleComment }) => {
    const user = useSelector((state) => state.user);
    const match = useRouteMatch('/blogs/:id');
    const blog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null;

    return (
        <Switch>
            <Route path="/blogs/:d">
                <Blog
                    blog={blog}
                    loggedInUser={user}
                    updateBlogLikes={handleLikes}
                    deleteBlog={handleDelete}
                    addComment={handleComment}
                />
            </Route>
            <Route path="/">
                <div className="blogList">
                    <Typography variant="h4" gutterBottom>
                        Blog List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {blogs.map((blog) => (
                                    <TableRow key={blog.id}>
                                        <TableCell>
                                            <Link
                                                className="blog"
                                                to={`/blogs/${blog.id}`}
                                            >
                                                {blog.title} {blog.author}
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Route>
        </Switch>
    );
};

export default BlogList;
