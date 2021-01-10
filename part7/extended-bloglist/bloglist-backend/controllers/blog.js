const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    }
    response.status(404).end();
});

blogRouter.post('/', async (request, response) => {
    const { body } = request;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        // null token or no user id
        response.status(401).json({ error: 'invalid or missing token' });
    }

    const user = await User.findById(decodedToken.id);
    const blogData = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    };
    const blog = new Blog(blogData);
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments,
        user: body.user.id,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    }).populate('user', { username: 1, name: 1 });
    response.json(updatedBlog);
});

blogRouter.post('/:id/comments', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        // null token or no user id
        response.status(401).json({ error: 'invalid or missing token' });
    }

    const blog = await Blog.findById(request.params.id);
    const comment = request.body.comment;

    if (comment.length > 256) return response.status(422).json({ error: 'comment too long' });
    if (comment.length === 0) return response.status(422).json({ error: 'no empty comment' });

    blog.comments = blog.comments.concat(comment);
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    }).populate('user', { username: 1, name: 1 });
    response.json(updatedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const blog = await Blog.findById(request.params.id);
    if (decodedToken.id === blog.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id);
        return response.status(204).end();
    }
    response.status(401).json({ error: 'action not authorizated' });
});

module.exports = blogRouter;
