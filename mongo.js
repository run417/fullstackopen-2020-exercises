const mongoose = require('mongoose');

let isInsert = false;

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
} else if (process.argv.length === 5) {
    isInsert = true;
}

const password = process.argv[2];
const url = `mongodb+srv://note_app_user-01:${password}@cluster0-0kgjo.mongodb.net/person-db?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

// Person.find({}, 'name').then((result) => {
//     const name = 'anna';
//     let isUnique = !result.some(r => r.name.toLowerCase() === name.toLowerCase())
//     console.log(isUnique);
//     mongoose.connection.close();
// });

if (isInsert) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({ name, number });
    person.save().then((result) => {
        console.log(`added ${result.name} name ${result.number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then((result) => {
        console.log('phonebook:');
        result.forEach((person) => {
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
    });
}
