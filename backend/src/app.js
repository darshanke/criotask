const express = require("express");
const app = express();
const routes = require("./route/index");
const cors = require("cors");

app.use(express.json());
app.use(cors());


app.use("/v1",routes);

module.exports = app;