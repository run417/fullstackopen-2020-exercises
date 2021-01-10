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
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };
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
                    <h2>list</h2>
                    {blogs.map((blog) => (
                        <div style={blogStyle} key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title} {blog.author}
                            </Link>
                        </div>
                    ))}
                </div>
            </Route>
        </Switch>
    );
};

export default BlogList;
