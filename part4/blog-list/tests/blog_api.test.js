const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    // eslint-disable-next-line no-restricted-syntax
    // for (let blog of helper.initialBlogs) {
    //     let blogObject = new Blog(blog);
    //     await blogObject.save();
    // }
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect('Content-Type', /application\/json/);
});

test('that all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('there exists a unique property called id', async () => {
    const response = await api.get('/api/blogs');
    const { length } = response.body;
    const index = Math.floor(Math.random() * (length - 0) + 0);
    expect(response.body[index].id).toBeDefined();
});

test('a blog is saved to db', async () => {
    const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const blogTitles = response.body.map((r) => r.title);
    expect(blogTitles).toContain('First class tests');
});

test('a specific blog is retrieved with a valid id', async () => {
    const blogs = await helper.blogsInDb();
    const index = Math.floor(Math.random() * (blogs.length - 0) + 0);
    const selectedBlogId = blogs[index].id;

    await api
        .get(`/api/blogs/${selectedBlogId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.id).toBe(selectedBlogId);
        });
});

test('retrieval fails 404 with a non existing valid id', async () => {
    const validNonExistingId = await helper.nonExistingId();
    await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
});

test('fails with a statuscode 400 if id is invalid', async () => {
    const invaidId = '533345efsvabdd';
    await api.get(`/api/blogs/${invaidId}`).expect(400);
});

test('verifies that missing like property defaults to 0', async () => {
    const newBlogMissingLikes = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    };

    expect(newBlogMissingLikes.likes).toBeUndefined();
    await api
        .post('/api/blogs')
        .send(newBlogMissingLikes)
        .expect(201)
        .expect((res) => {
            expect(res.body.likes).toBeDefined();
            expect(res.body.likes).toBe(0);
        });
});

test('missing title and url is responded with 400 bad request', async () => {
    const newBlogMissingTitleAndUrl = {
        author: 'Robert C. Martin',
        likes: 3,
    };
    await api.post('/api/blogs').send(newBlogMissingTitleAndUrl).expect(400);
});

test('deletion of a blog suceeds 204 with valid an valid id', async () => {
    const blogs = await helper.blogsInDb();
    const index = Math.floor(Math.random() * (blogs.length - 0) + 0);
    const selectedBlogId = blogs[index].id;

    await api.delete(`/api/blogs/${selectedBlogId}`).expect(204);
});

test('blog is updated with 200', async () => {
    const blogs = await helper.blogsInDb();
    const index = Math.floor(Math.random() * (blogs.length - 0) + 0);
    const selectedBlog = blogs[index];
    selectedBlog.likes = 15;

    await api
        .put(`/api/blogs/${selectedBlog.id}`)
        .send(selectedBlog)
        .expect(200)
        .expect((res) => {
            expect(res.body.likes).toBe(selectedBlog.likes);
        });
});

afterAll(() => {
    mongoose.connection.close();
});
