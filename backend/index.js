require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/phonebook")
const app = express()
const errorHandler = (error, request, response, next) => {
    if(error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    } else {
        console.log(`Undocumented error ${error}`)
    }
    next(error)
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

morgan.token("body", (req) => JSON.stringify(req.body))

app.use(express.static("build"))
app.use(express.json())
app.use(cors())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))


app.get("/info", (request, response) => {
    response.send(`
        <p>Phonebook has info of ${Person.length} people</p>
        <p>${new Date()}</p>
  `)
})

app.get("/api/persons", (request, response) => {
    Person
        .find({})
        .then(persons => response.json(persons))
})

app.get("/api/persons/:id", (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(persons => response.json(persons))
        .catch(error => {
            next(error)
        })
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body
  
    if (body === undefined) {
        return response.status(400).json({ error: "content missing" })
    }
  
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
        .catch(error => {
            next(error)
        })
})

app.put("/api/persons/:id", (request,response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204.).end()
        })
        .catch(error => next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

