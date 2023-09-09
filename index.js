import express from "express";

let data = [
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
];

const app = express();
app.use(express.json())

app.get("/api/persons", async(req, res) => {
    try {
        res.status(200).json({data});
    } catch (error) {
        console.log(error);
    }
})

app.get("/info", async(req, res) => {
    try {
        const len = data.length;
        const date = new Date();
        res.status(201).send(`<p>Phonebook has info for ${len} people</p><br/> <p>${date}</p>`)
    } catch (error) {
        console.log(error);
    }
})

app.get("/api/persons/:id", async (req, res) => {
    try {
        const id = req.params.id;
        // Assuming 'data' is an array of objects with an 'id' property
        const curr = data.find((val) => val.id === parseInt(id));

        if (curr) {
            res.status(200).json({ curr });
        } else {
            res.status(404).json({ error: "Person not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/api/persons/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const curr = data.find((val) => val.id === parseInt(id));

        if (!curr) {
            return res.status(404).json({ error: "Person not found" });
        }

        data = data.filter((val) => val.id !== parseInt(id));
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/persons", (req, res) => {
    try {
        let len = data.length + 10;
        let currId;

        while (true) {
            const id = Math.floor(Math.random() * len);
            const curr = data.find((val) => val.id === id);

            if (!curr) {
                currId = id;
                break;
            }
        }

        const newData = req.body;

        if (!newData.name || !newData.number) {
            return res.status(400).json({ error: "Name or number is missing" });
        }

        const duplicateName = data.find(
            (val) => val.name.toLowerCase() === newData.name.toLowerCase()
        );

        const duplicateNumber = data.find((val) => val.number === newData.number);

        if (duplicateName || duplicateNumber) {
            return res.status(400).json({ error: "Name or number already exists" });
        }

        const newPerson = {
            id: currId,
            ...newData
        };

        data.push(newPerson);
        res.status(201).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const PORT = 8001
app.listen(PORT, () => {
    console.log(`Port is running in ${PORT}`)
})
