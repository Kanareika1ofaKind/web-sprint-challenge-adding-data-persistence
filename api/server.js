const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./project/router.js');
const resourceRouter = require('./resource/router.js');
const taskRouter = require('./task/router.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
});

// Middleware
server.use("/api/projects", projectRouter); // mount project router
server.use("/api/resources", resourceRouter); // mount resource router
server.use("/api/tasks", taskRouter); // mount task router


// Error handling middleware
server.use((err, req, res, next) => { // eslint-disable-line

    if (err.status) {
        res.status(err.status).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

module.exports = server;
