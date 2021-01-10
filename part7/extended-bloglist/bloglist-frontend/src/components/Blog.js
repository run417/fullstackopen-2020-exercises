import React from 'react';
import PropTypes from 'prop-types';

const Blog = ({
    blog,
    loggedInUser,
    updateBlogLikes,
    deleteBlog,
    addComment,
}) => {
    if (blog === undefined) return 'loading...';
    const handleLikes = () => {
        console.log(blog);
        blog.likes += 1;
        updateBlogLikes(blog);
    };

    const handleComment = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        addComment({ id: blog.id, comment });
    };

    const handleDelete = () => {
        const confirmation = window.confirm(
            `Remove ${blog.title} by ${blog.author}`
        );

        if (confirmation) {
            deleteBlog(blog);
        }
    };

    return (
        <div className="blog">
            <h2>
                {blog.title} - {blog.author}{' '}
            </h2>
            <p>{blog.url}</p>
            <p>
                likes <span className="likeCount">{blog.likes}</span>{' '}
                <button onClick={handleLikes}>like</button>
            </p>
            <p>{blog.author}</p>
            {loggedInUser !== null &&
            loggedInUser.username === blog.user.username ? (
                <button onClick={handleDelete}>remove</button>
            ) : (
                ''
            )}
            <div className="comments">
                <h3>comments</h3>
                <form onSubmit={handleComment}>
                    <input type="text" name="comment" />
                    <button type="submit">add comment</button>
                </form>
                <ul>
                    {blog.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object,
    loggedInUser: PropTypes.object.isRequired,
    updateBlogLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
