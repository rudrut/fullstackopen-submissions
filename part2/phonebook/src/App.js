import React, { useState } from "react";
import PersonsDisplay from "./components/PersonsDisplay";
import SearchFilter from "./components/SearchFilter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";

const App = (props) => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "0700123123" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [search, setSearch] = useState("");
	const [showAll, setShowAll] = useState(false);

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
			setPersons(persons.concat(personObject));
			setNewName("");
			setNewNumber("");
			console.log(persons);
		}
	};

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
			<SearchFilter
				value={search}
				onChange={handleSearchChange}
			/>
			<h2>Add new contact info</h2>
      <PersonForm onSubmit={addName} namevalue={newName} onNameChange={handleNameChange} numbervalue={newNumber} onNumberChange={handleNumberChange} />
			<h2>Numbers</h2>
			<PersonsDisplay
				personsToShow={personsToShow.map((person) => {
					return <Person key={person.name} {...person} />;
				})}
			/>
			<div></div>
		</div>
	);
};

export default App;
