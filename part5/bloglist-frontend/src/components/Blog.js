import React, { useState } from 'react';
import Toggleable from './Toggleable';

const BlogDetails = ({ blog }) => <div>{blog.url}</div>;

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
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
                    likes {blog.likes} <button>like</button>
                </p>
                <p>{blog.author}</p>
            </div>
        </div>
    );
};

export default Blog;
