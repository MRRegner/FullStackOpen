import React, { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [newFilter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [NotificacionClass, setNotificacionClass] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

  const addName = (event) => {

    event.preventDefault()

    function findPerson(person) {
      return person.name.toLowerCase() === newName.toLowerCase()
    }

    let alreadyAdded = persons.find(person => findPerson(person));

    if (alreadyAdded) {
      updateName(alreadyAdded)
    } else {

      const nameObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
          setPersonsToShow(persons.concat(returnedName))
          setFilter('')
          setNotificationMessage(
            `Added ${returnedName.name} `
          )
          setNotificacionClass('success')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })

    }
  }

  const updateName = (alreadyAdded) => {
    const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

    if (confirmUpdate) {

      const nameObject = {
        name: alreadyAdded.name,
        number: newNumber
      }

      phonebookService
        .update(alreadyAdded.id, nameObject)
        .then(returnedName => {
          setPersons(persons.map(person => person.id !== alreadyAdded.id ? person : returnedName))
          setNewName('')
          setNewNumber('')
          setPersonsToShow(persons.map(person => person.id !== alreadyAdded.id ? person : returnedName))
          setFilter('')
          setNotificationMessage(
            `Updated ${returnedName.name} `
          )
          setNotificacionClass('success')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
            `Information of ${alreadyAdded.name} has already been removed from server`
          )
          setNotificacionClass('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== alreadyAdded.id))
          setPersonsToShow(persons.filter(n => n.id !== alreadyAdded.id))
        })
    }
  }

  const destroyName = (id, name) => {
    if (window.confirm(`Delete ${name}?`))
      phonebookService
        .destroy(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setPersonsToShow(persons.filter(n => n.id !== id))
        })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonFilter = (event) => {

    function filterItems(arr, query) {
      return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
    }

    setFilter(event.target.value)
    setPersonsToShow(filterItems(persons, event.target.value))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={notificationMessage} NotificacionClass={NotificacionClass}/>

      <Filter newfilter={newFilter} handlePersonFilter={handlePersonFilter} />

      <h3>add a new</h3>

      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} destroyName={destroyName} />
    </div>
  )
}

export default App
