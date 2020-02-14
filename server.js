const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const actionRouter = require('./routers/actionRouter.js');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
    res.send(` <h2> Dani Blackwell</h2>`)
});

function logger(req, res, next) {
    const { method, orginalUrl} = req;
    console.log(`${method} to ${orginalUrl}`)
    next()
}

module.exports = server;