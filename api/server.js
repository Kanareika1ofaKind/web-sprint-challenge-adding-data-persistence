// build your server here and require it from index.js
const express = require("express")

const projectRouter = require("./project/router")

const resourceRouter = require("./resource/router")

const taskRouter = require("./task/router")

const server = express()

server.use(express.json())

server.use("api/projects", projectRouter); // mount project router
server.use("api/tasks", taskRouter); // mount task router
server.use("api/resources", resourceRouter); // mount resource router
server.get("/", (req, res) => {
  res.status(200).json({ api: "up" })
})

module.exports = server

