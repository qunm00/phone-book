import React from 'react'
import Person from './Person'

const Numbers = ({
  personsToShow,
  removePerson
}) => {
    return (
      <div>
        {personsToShow.map(person => 
          <span key={person.id}>
            <Person name={person.name} phone={person.number}/>
            <button onClick={() => removePerson(person.name)}>Delete</button>
          </span>
        )}
      </div>
    )
}

export default Numbers
