// file3.js

// Import Express module
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Define the port to run the server
const PORT = 3000;

// Read JSON data
const readData = () => {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'data.json'), 'utf8');
    return JSON.parse(data);
};

// Write JSON data
const writeData = (data) => {
    fs.writeFileSync(path.join(__dirname, 'data', 'data.json'), JSON.stringify(data, null, 2), 'utf8');
};

// CREATE operation
app.post('/data', (req, res) => {
    const data = readData();
    const newData = req.body;
    newData.id = data.length + 1;
    data.push(newData);
    writeData(data);
    res.status(201).send(newData);
});

// READ operation
app.get('/data', (req, res) => {
    res.send(readData());
});

// UPDATE operation
app.put('/data/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const index = data.findIndex(item => item.id === id);

    if (index === -1) {
        res.status(404).send('Data not found');
        return;
    }

    data[index] = { id, ...updatedData };
    writeData(data);
    res.send(data[index]);
});

// DELETE operation
app.delete('/data/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);

    if (index === -1) {
        res.status(404).send('Data not found');
        return;
    }

    const deletedData = data.splice(index, 1);
    writeData(data);
    res.send(deletedData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
