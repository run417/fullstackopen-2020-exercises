const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);
const monogoUrl = `mongodb+srv://blog_user_01:lhIL0tJX0LidDAOQ@cluster0-0kgjo.mongodb.net/blog_list_db?retryWrites=true&w=majority`;

mongoose
    .connect(monogoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to mongoDb:', result.connection.name))
    .catch((error) => console.log(error.message));

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => response.json(blogs));
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then((savedBlog) => response.status(201).json(savedBlog));
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
