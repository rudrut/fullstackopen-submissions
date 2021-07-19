import React, { useState } from 'react'

const SearchFilter = () => {

}

const PersonForm = () => {

}

const PersonsDisplay = () => {

}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name : 'Arto Hellas', number: '0700123123' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(false)

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const addName = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log(persons);
    }
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    console.log(personsToShow)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
        Filter by: <input value={search} onChange={handleSearchChange}/>
        <div>debug: {search}</div>
        </div>
      <h2>Add new contact info</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}        
    </div>
  )
}

export default App