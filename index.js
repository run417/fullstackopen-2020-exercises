const express = require('express');

const morgan = require('morgan');

const cors = require('cors');

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
app.use(express.json());
app.use(cors());
app.use(express.static('build'));
app.use(morgan('tiny'));

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1,
    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2,
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3,
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4,
    },
];

app.get('/', (request, response) => {
    response.send('<div>Phonebook backend</div>');
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.get('/info', (request, response) => {
    const count = persons.length;
    const date = new Date();
    response.send(`<div><p>Phonebook has info on ${count} people</p><p>${date}</p></div>`);
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const length = persons.length;
    persons = persons.filter(p => p.id !== id);
    if (length !== persons.length) {
        response.status(204).end();
    } else {
        response.status(404).end();
    }
});

const generateId = () => {
    const min = Math.ceil(10);
    const max = Math.floor(10000);
    return Math.floor(Math.random() * (max - min)) + min;
};

const isNameUnique = (name) => {
    const found = persons.find(p => p.name === name);
    return found === undefined;
};

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name) {
        return response.status(400).json({
            error: 'a name is required',
        });
    } else if (!isNameUnique(body.name)) {
        return response.status(400).json({
            error: 'name must be unique',
        });
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'a number is required',
        });
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };
    persons = persons.concat(person);
    response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
