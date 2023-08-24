import express, { json, response } from "express"
import morgan from "morgan";
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cors())

let contacts  = [
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

app.get("/info", (req, res) => {
    try {
        const total = contacts.length;
        const time = new Date()
        res.send(`<h2>Phonebook has info of ${total} people</h2><br></br><h2>${time}</h2>`)

    } catch (error) {
        response.status(404).send(error)
    }
})

app.get("/api/contacts/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = contacts.find(contact => contact.id === id);

        if (!data) {
            res.status(404).json({ error: "Contact not found" });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.delete("/api/contacts/:id", (req, res) => {
    try {
        const id = Number(req.params.id);
        contacts = contacts.filter(contact => contact.id !== id);
        res.status(204).json(contacts)
    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
});

app.post("/api/contacts", (req, res) => {
    try {
        let maxId = 0;
        contacts.forEach(contact=> {
            maxId = Math.max(maxId, contact.id)
        })
        let data = req.body;
        const newContact = {id:maxId+1, ...data} 
        contacts.push(newContact)
        res.status(201).json(newContact)

    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred" });
    }
})

const PORT = 3001;
app.listen(PORT, ()=> {
    console.log(`app is running on ${PORT}`)
})