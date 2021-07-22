import React, { useState, useEffect } from "react";
import PersonsDisplay from "./components/PersonsDisplay";
import SearchFilter from "./components/SearchFilter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";
import Notification from "./components/Notification"
import Error from "./components/Error";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      );

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      if (window.confirm("Person already exists, do you wish to update number?")) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const changedPerson = {...person, number: newNumber}
        
        personService.update(id, changedPerson).then((returnedPerson) => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setMessage(
            `Number '${person.number}' was successfully updated`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(() => {
          setErrorMessage(
            `Person '${person.name}' has already been deleted`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        setNewName("");
        setNewNumber("");
        
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(
          `Person '${returnedPerson.name}' was successfully added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteName = (id) => {
    const toDelete = id

    if (window.confirm("Do you really want to delete?")) {
      personService.remove(id)
      setPersons(persons.filter(p => p.id !== toDelete))
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    //console.log(personsToShow);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={errorMessage} />
      <SearchFilter value={search} onChange={handleSearchChange} />
      <h2>Add new contact info</h2>
      <PersonForm
        onSubmit={addPerson}
        namevalue={newName}
        onNameChange={handleNameChange}
        numbervalue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonsDisplay
        personsToShow={personsToShow.map((person) => {
          return (
						<div key={person.id}>
							<Person {...person} /> <button onClick={() => deleteName(person.id, person)}> delete </button>
						</div>
					)
        })}
      />
      <div></div>
    </div>
  );
};

export default App;
