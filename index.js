import express from "express"
const app = express();

const contacts  = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/contacts", (request, response)=> {
    try {
        response.status(200).json(contacts)
    } catch (error) {
        response.status(404).send("Not Found")
    }
})

const PORT = 3001;
app.listen(PORT, ()=> {
    console.log(`app is running on ${PORT}`)
})