import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Notification = ({ message }) => {
    if (message === null) return null;
    return(
        <div className={`${message.type}Message`}>{message.text}</div>
    )
}

const Entry = (props) => {
    const {name, number, id} = props.entry;
    const deleteEntry = props.deleteEntry;
    return (
        <p>
            {name} {number} <button onClick={() => deleteEntry(id)}>delete</button>
        </p>

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
    const {phonebook, filteredPhonebook, filterCriteria, deleteEntry} = props;
    const entries = (filterCriteria.length > 0) ? filteredPhonebook : phonebook;
    return (
        <div>
            {entries.map((entry) =>
                <Entry
                    key={entry.name}
                    entry={entry}
                    deleteEntry={deleteEntry}
                />
            )}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        phonebookService
            .getAll()
            .then(intialPhonebook => {
                setPersons(intialPhonebook);
                console.log(intialPhonebook)
            })
    }, [])

    const hasIndex = (name) => {
        let index = -1;
        persons.forEach((person, i) => {
            if (name === person.name) {
                index = i;
            }
        });
        return index;
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
        const index = hasIndex(newName);
        if (index < 0) {
            const entry = { name: newName, number: newNumber };
            phonebookService
                .create(entry)
                .then(returnedEntry => {
                    console.log(returnedEntry);
                    setPersons(persons.concat(returnedEntry))
                    setMessage(
                        {
                            text: `Added ${returnedEntry.name}`,
                            type: 'success',
                        }
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })

            if (filterCriteria.length > 0) {
                console.log(filterCriteria);
                // setting the state is not immediate
                // validate empty name, number
            }
            clearAddNewForm();
        } else {
            // not checking for number equality
            const message = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
            if (message) {
                const entry = persons[index];
                const newObject = { ...entry, number: newNumber }
                phonebookService
                    .update(entry.id, newObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== entry.id ? p : returnedPerson))
                        if (filterCriteria.length > 0) {
                            setFiltered(filtered.map(f => f.id !== entry.id ? f : returnedPerson))
                        }
                        clearAddNewForm();
                    })
            }
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const deleteEntry = (id) => {
        const entry = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${entry.name} ?`)) {
            phonebookService
                .deleteEntity(entry.id)
                .then(() => {
                    console.log('deleted')
                    setPersons(persons.filter(p => p.id !== entry.id))
                    if (filterCriteria.length > 0) {
                        setFiltered(filtered.filter(f => f.id !== entry.id))
                    }
                })
                .catch(error =>{
                    setMessage({
                        text: `the person - ${entry.name} is already deleted from server`,
                        type: 'error'
                    });
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000);
                })
        }
        console.log(entry)
    }

    const onChangeFilter = (event) => {
        const value = event.target.value;
        setFiltered(filterPhonebook(value));
        setFilterCriteria(value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
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
            <DisplayPhonebook
                phonebook={persons}
                filteredPhonebook={filtered}
                filterCriteria={filterCriteria}
                deleteEntry={deleteEntry}
            />
        </div>
    )
}

export default App;