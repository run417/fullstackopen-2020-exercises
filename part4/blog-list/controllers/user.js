const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

userRouter.post('/', async (request, response) => {
    const { body } = request;
    const { password } = body;
    if (password === undefined || password.length < 3) {
        response
            .status(400)
            .json({ error: 'please provide a password with at least 3 characters' });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();
    response.send(savedUser);
});

module.exports = userRouter;
