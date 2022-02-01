import React from 'react'

const PersonForm = (props) => {
    const savePerson = props.savePerson
    const newName = props.newName
    const setNewName = props.setNewName
    const setNewPhonenumber = props.setNewPhonenumber
    const newPhonenumber = props.newPhonenumber
return (
    <form onSubmit={savePerson}>
        <div>
            name: <input value={newName} 
                         onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <div>
            number: <input value={newPhonenumber} 
                           onChange={(event) => setNewPhonenumber(event.target.value)}/>
        </div>
        <button type="submit">add</button>
    </form>
)}


export default PersonForm