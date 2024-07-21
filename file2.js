// file2.js

// Import Express module
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();

// Define the port to run the server
const PORT = 3000;

// Define a route to display the JSON data
app.get('/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading JSON file');
            return;
        }
        res.send(data);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
