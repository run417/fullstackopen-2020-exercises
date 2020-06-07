require('dotenv').config();

const express = require('express');

const morgan = require('morgan');

const cors = require('cors');

const Person = require('./models/person');

morgan.token('tiny', (tokens, req, res) => {
    const method = tokens.method(req, res);
    const format = [
        method,
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        (method === 'POST') ? JSON.stringify(req.body) : '',
    ].join(' ');
    return format;
});

const app = express();
app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/', (request, response) => {
    response.send('<div>Phonebook backend</div>');
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params;
    Person.findById(id).then((person) => { response.json(person); });
});

app.get('/info', async (request, response, next) => {
    let count = await Person.find({}, 'name')
        .then(result => result.length)
        .catch(error => next(error));
    const date = new Date();
    response.send(`<div><p>Phonebook has info on ${count} people</p><p>${date}</p></div>`);
});

app.delete('/api/persons/:id', (request, response, next) => {
    const { id } = request.params;
    Person.findByIdAndRemove(id)
        .then(result => response.status(204).end())
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const { body } = request;
    const person = {
        name: body.name,
        number: body.number,
    };
    console.log(person);

    Person.findByIdAndUpdate(
        request.params.id,
        person,
        { new: true, runValidators: true, context: 'query' },
    )
        .then(updatedNote => response.json(updatedNote))
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    const { body } = request;

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save()
        .then((savedPerson) => { response.json(savedPerson); })
        .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.log('Error: ', error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    // eslint-disable-next-line no-else-return
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message });
    }
    next(error);
};

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
