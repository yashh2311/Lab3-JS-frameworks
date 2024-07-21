// file1.js

// Import Express module
const express = require('express');

// Create an Express application
const app = express();

// Define the port to run the server
const PORT = 3000;

// Define a simple route to display group names
app.get('/', (req, res) => {
    res.send('<h1>Group Members Names</h1><ul><li>Yashkumar Patel</li><li>Virat Kohli</li><li>Akshay Rana</li></ul>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
