const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./utils/config');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();

logger.info('connecting to', config.MONGODB_URI);
mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to mongoDb:', result.connection.name))
    .catch((error) => console.log(error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
