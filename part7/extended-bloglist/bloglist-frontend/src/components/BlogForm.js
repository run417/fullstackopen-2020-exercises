import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const saveBlog = (event) => {
        event.preventDefault();
        addBlog({ title, author, url });
        setTitle('');
        setAuthor('');
        setUrl('');
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
        <div>
            <Typography variant="h4">create new</Typography>
            <form className={classes.root} onSubmit={saveBlog}>
                <div>
                    <TextField
                        name="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        label="title"
                        variant="outlined"
                        size="small"
                    />
                </div>
                <TextField
                    name="author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                    label="author"
                    variant="outlined"
                    size="small"
                />

                <div>
                    <TextField
                        name="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        label="url"
                        variant="outlined"
                        size="small"
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                >
                    create
                </Button>
            </form>
        </div>
    );
};

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
