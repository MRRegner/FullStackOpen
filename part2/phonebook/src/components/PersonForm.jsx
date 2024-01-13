import React from 'react'

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => (

    <form onSubmit={addName}>

        name: <input value={newName} onChange={handleNameChange} /><br />

        number: <input value={newNumber} onChange={handleNumberChange} /> <br />

        <button type="submit">add</button>
    </form>

)

export default PersonForm