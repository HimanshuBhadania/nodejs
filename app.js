const express = require("express");
const app = express();
const userDataRouter = require("./router/userrouter")


app.use(express.json());
app.use("/api/v1/user",userDataRouter)

module.exports = app;
