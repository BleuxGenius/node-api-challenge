const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
const actionRouter = require('./routers/actionRouter.js');
const projectRouter = require("./routers/projectRouter");

const server = express();

// server.use(cors());
// server.use(helmet());
server.use(express.json());
server.use(logger);
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get('/', logger, (req, res) => {
    res.send(` <h2> Dani Blackwell</h2>`)
});

module.exports = server;

function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.orginalUrl}`);
    
    next();
}

