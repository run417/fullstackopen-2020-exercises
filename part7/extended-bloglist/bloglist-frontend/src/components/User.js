import React from 'react';
import BlogList from './BlogList';
const User = ({ user, updateBlogLikes, deleteBlog, addComment }) => {
    if (user === undefined) return null;
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <BlogList
                blogs={user.blogs}
                handleLikes={updateBlogLikes}
                handleDelete={deleteBlog}
                handleComment={addComment}
            />
        </div>
    );
};

export default User;
