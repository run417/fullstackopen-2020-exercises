import React, { useState } from 'react';

const Blog = ({ blog, loggedInUser, updateBlogLikes, deleteBlog }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleLikes = () => {
        blog.likes += 1;
        updateBlogLikes(blog);
    };

    const handleDelete = () => {
        const confirmation = window.confirm(
            `Remove ${blog.title} by ${blog.author}`
        );

        if (confirmation) {
            deleteBlog(blog);
        }
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };
    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                <p>
                    {blog.title} - {blog.author}{' '}
                    <button onClick={toggleVisibility}>view</button>
                </p>
            </div>
            <div style={showWhenVisible}>
                <p>
                    {blog.title} - {blog.author}{' '}
                    <button onClick={toggleVisibility}>hide</button>
                </p>
                <p>{blog.url}</p>
                <p>
                    likes {blog.likes}{' '}
                    <button onClick={handleLikes}>like</button>
                </p>
                <p>{blog.author}</p>
                {loggedInUser !== null &&
                loggedInUser.username === blog.user.username ? (
                    <button onClick={handleDelete}>remove</button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Blog;
