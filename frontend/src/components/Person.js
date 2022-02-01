import React from 'react'

const Person = (props) => {
    const name = props.name
    const phone = props.phone
    
    return (
        <p>{name} {phone}</p>
    )
}

export default Person 