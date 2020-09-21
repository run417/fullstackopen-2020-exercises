const blogRouter = require('express').Router();

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
    const users = await User.find({});
    const user = users[1];
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
    user.blogs = response.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog);
});

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

module.exports = blogRouter;
