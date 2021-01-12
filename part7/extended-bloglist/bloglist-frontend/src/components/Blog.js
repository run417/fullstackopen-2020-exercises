import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Button,
    TextField,
    Divider,
    Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));
    const classes = useStyles();

    return (
        <div className="blog">
            <Typography variant="h5">
                {blog.title} - {blog.author}{' '}
            </Typography>
            <Typography>
                {blog.url}
                <br></br>
                likes <span className="likeCount">{blog.likes}</span>{' '}
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={handleLikes}
                >
                    like
                </Button>
                <br></br>
                {blog.author}
            </Typography>
            {loggedInUser !== null &&
            loggedInUser.username === blog.user.username ? (
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleDelete}
                >
                    remove
                </Button>
            ) : (
                ''
            )}
            <Toolbar />
            <Divider />
            <div className="comments">
                <form className={classes.root} onSubmit={handleComment}>
                    <TextField
                        variant="outlined"
                        label="Comment"
                        name="comment"
                        size="small"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                    >
                        add comment
                    </Button>
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
