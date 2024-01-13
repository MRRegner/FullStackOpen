import React from 'react'

const Persons = ({ personsToShow, destroyName }) => (
    <>
        {personsToShow.map(person => (

            <p key={person.name}>{person.name} {person.number}
                <button key={person.id}
                    onClick={() => destroyName(person.id, person.name)}>
                    Delete
                </button>
            </p>

        ))}
    </>
)

export default Persons