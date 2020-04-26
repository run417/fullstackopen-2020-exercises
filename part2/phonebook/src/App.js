import React, { useState } from 'react'

const Entry = (props) => {
    const {name, number} = props;
    return (
        <p>{name} {number}</p>
    )
}

const Form = (props) => {
    const {name,number, handleNameChange, handleNumberChange, handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
        <div>
            name: <input onChange={handleNameChange} value={name}/>
        </div>
        <div>
            number: <input onChange={handleNumberChange} value={number}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
    )
}

const DisplayPhonebook = (props) => {
    const {phonebook, filteredPhonebook, filterCriteria} = props;
    if (filterCriteria.length > 0) {
        return (
            <div>
                {filteredPhonebook.map((entry) => <Entry key={entry.name} name={entry.name} number={entry.number} />)}
            </div>
        )
    } else {
        return (
            <div>
                {phonebook.map((entry) => <Entry key={entry.name} name={entry.name} number={entry.number} />)}
            </div>
        )
    }
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);

    const [filtered, setFiltered] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const isDuplicate = (name) => {
        let isDuplicate = false;
        persons.forEach(person => {
            if (name === person.name) {
                isDuplicate = true;
            }
        });
        return isDuplicate;
    }

    const filterPhonebook = (name) => {
        let filteredPersons = persons.filter(person => (person.name.toLowerCase().includes(name)));
        return filteredPersons;
    }

    const clearAddNewForm = () => {
        setNewName('');
        setNewNumber('');
    }

    const addName = (event) => {
        event.preventDefault();
        if (!isDuplicate(newName)) {
            const entry = { name: newName, number: newNumber };
            setPersons(persons.concat(entry));
            if (filterCriteria.length > 0) {
                console.log(filterCriteria);
                // setting the state is not immediate
                // validate empty name, number

            }
            clearAddNewForm();
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const onChangeFilter = (event) => {
        const value = event.target.value;
        setFiltered(filterPhonebook(value));
        setFilterCriteria(value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>filter shown with <input onChange={onChangeFilter} value={filterCriteria} /></div>

            <h2>add a new</h2>
            <Form
                name={newName}
                number={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                handleSubmit={addName}
            />

            <h2>Numbers</h2>
            <DisplayPhonebook phonebook={persons} filteredPhonebook={filtered} filterCriteria={filterCriteria}/>
        </div>
    )
}

export default App;