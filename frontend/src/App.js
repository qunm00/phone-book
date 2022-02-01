import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filterName, setNewFilterName ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newPhonenumber, setNewPhonenumber ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState(true)

  useEffect(() => {
    PersonService
      .getAll()
      .then(person => {
        setPersons(person)
      })
  }, [])

  const containPerson = (name) => {
    return persons.some(person => person.name === name)
  }

  const findPersonByName = (name) => {
    return persons.find(person => person.name === name)
  }

  const savePerson = (event) => {
    event.preventDefault()

    if (containPerson(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        updatePerson(newName, newPhonenumber)
      }
    } else {
      const person = {
        name: newName,
        number: newPhonenumber
      }
      PersonService
        .create(person)
        .then(createdPerson => {
          // objects in persons aren't the same
          setPersons(persons.concat(createdPerson))
          setMessage(`Added ${createdPerson.name}`)
          setMessageType(true)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setMessageType(false)
        })
    }

    setNewName('')
    setNewPhonenumber('')
    setTimeout(() =>
      setMessage(''),
    5000)
  }

  const updatePerson = (name, phonenumber) => {
    // update person in backend
    const person = findPersonByName(name)
    person.number = phonenumber
    PersonService
      .update(person.id, person)
      .then(updatedPerson => {
        // update person in frontend
        const newPersons = [...persons]
        newPersons.forEach(person => {
          if (person.name === name) {
            person.number = phonenumber
          }
        })
        setPersons(newPersons)
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setMessageType(false)
      })
  }

  const removePerson = (name) => {
    const person = findPersonByName(name)
    const result = window.confirm(`Delete ${person.name} ?`)
    if (result) {
      const newPersons = [...persons]
      newPersons.splice(newPersons.indexOf(person), 1)
      setPersons(newPersons)
      PersonService.remove(person.id)
    }
  }


  const personsToShow = filterName === '' 
    ? persons 
    : persons.filter(
        person => person.name
                        .toLowerCase()
                        .includes(filterName.toLowerCase())
      )


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType}/>
      <Filter filterName={filterName} setNewFilterName={setNewFilterName} />
      <h2>add a new</h2>
      <PersonForm savePerson={savePerson} 
                  newName={newName} 
                  setNewName={setNewName}
                  newPhonenumber={newPhonenumber}
                  setNewPhonenumber={setNewPhonenumber}/>
      <h1>Numbers</h1>
      <Numbers personsToShow={personsToShow}
               removePerson={removePerson}/>
    </div>
  )
}

export default App