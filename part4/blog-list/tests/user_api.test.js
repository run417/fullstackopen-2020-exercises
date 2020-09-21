const bcrypt = require('bcrypt');
const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is one user in db initially', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({ username: 'root', name: 'admin', passwordHash });
        await user.save();
    });

    test('creation is successful with a new username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'sky_blogger',
            name: 'Alena',
            password: 'newsecret',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-type', /application\/json/);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('account creation fails when provided username already exists', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            username: 'root',
            name: 'Napster',
            password: 'fl3&86T+23@!%#Ns',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});

describe('when creating users', () => {
    test('fails if username is blank or not defined', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = { username: '', name: 'Himaya', password: '5#fdcY0?1!@' };
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error).not.toBeUndefined();

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('fails if username is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = { username: 'ds', name: 'Himaya', password: '5#fdcY0?1!@' };
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(result.body.error).not.toBeUndefined();

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('fails if password is undefined or less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb();
        const newUser = { username: 'newuser', name: 'greg', password: 'fd' };
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
        expect(result.body.error).not.toBeUndefined();
    });
});

afterAll(() => {
    mongoose.connection.close();
});
