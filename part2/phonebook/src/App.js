import React, { useState, useEffect } from "react";
import PersonsDisplay from "./components/PersonsDisplay";
import SearchFilter from "./components/SearchFilter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

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

  const addName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`);
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
      console.log(persons);
    }
  };

  const deleteName = (id, personObject) => {
    if (window.confirm("Do you really want to delete?")) {
      personService.remove(id, personObject);
    }
  };

  /*useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])
	*/

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(props.personsToShow);
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
      <SearchFilter value={search} onChange={handleSearchChange} />
      <h2>Add new contact info</h2>
      <PersonForm
        onSubmit={addName}
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
