// build your server here and require it from index.js
const express = require("express")

const projectRouter = require("./project/router")

const resourceRouter = require("./resource/router")

const taskRouter = require("./task/router")

const server = express()

server.use(express.json())

server.use("/api/project", projectRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" })
})

module.exports = server

