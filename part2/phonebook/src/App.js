import { useState, useEffect } from 'react';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm.js';
import Notification from './components/Notification';
import contactService from './services/contacts.js';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState('');
  const [notiMessage, setNotiMessage] = useState({
    message: null,
    isErrorMsg: false
  });


  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  // delete person function
  const deletePerson = id => {
    console.log(`Deleting Person ID ${id}`);
    const person = persons.find(person => person.id === id);
    console.log(person);

    contactService.deletePerson(id, person, setNotiMessage, setPersons, persons);
    
  }

  // submit button event handler
  const handleClick = e => {
    e.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
    }

    // Check if name already in persons
    if (persons.some(person => person.name === newName)) {
      const person = persons.find(person => person.name === newName);
      console.log(person);
      // check if newNumber from state 
      if (newNumber) {
        console.log(`there's a new number.. ${newNumber}`);
        // ask to update with the new number
        contactService
          .update(person, newPersonObj, setNotiMessage)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            console.log(error);
          })
        
        // update notification message
        setNotiMessage({
          isErrorMsg: false,
          message: `Updated number for ${newPersonObj.name}`
        })
        setTimeout(() => {
          setNotiMessage({
            isErrorMsg: false,
            message: null
          });
        }, 5000);

        setNewName('');
        setNewNumber('');
      } else {
        console.log('theres no new number avail');
        alert(`${newName} is already added to phonebook`);
        setNewName('');
        setNewNumber('');
      }

    } else {
      // add the new person object to the database
      contactService
        .create(newPersonObj)
        .then(newPerson => {
          // update state by concatting the new person to the current state
          setPersons(persons.concat(newPerson));
          setNewName('');
          setNewNumber('');

          // add then reset the notification message
          setNotiMessage({
            isErrorMsg: false,
            message: `Added ${newPersonObj.name}`
          })
          setTimeout(() => {
            setNotiMessage({
              isErrorMsg: false,
              message: null
            });
          }, 5000);
        })
        .catch(error => {
          console.log(error.response.data);
          setNotiMessage({
            isErrorMsg: true,
            message: error.response.data.error,
          });
          setTimeout(() => {
            setNotiMessage({
              isErrorMsg: false,
              message: null
            });
          }, 5000);
        });
      }
    }

  // add a new - input event handlers
  const handleNameChange = (e) => {
    const newInput = e.target.value;
    setNewName(newInput);
  }

  const handleNumberChange = (e) => {
    const newNumberInput = e.target.value;
    setNewNumber(newNumberInput);
  }

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === '') {
      setShowAll(true);
    } else {
      setShowAll(false);
      setFilter(value);
    }
  }
  
  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notiMessage} />
      <Filter handleFilter={handleFilter}/>

      <h2>add a new</h2>

      <PersonForm 
        nameOnChange={handleNameChange}
        nameValue={newName}
        numberOnChange={handleNumberChange}
        numberValue={newNumber}
        submitFunc={handleClick}
      />

      <h2>Numbers</h2>

      <Contacts 
        persons={personsToShow} 
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App