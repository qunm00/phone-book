const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Phonebook", phonebookSchema)

const person = new Person({
    name: name,
    number: number
})

if (process.argv.length == 3) {
    console.log("phonebook:")
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}


