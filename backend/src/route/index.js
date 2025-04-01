const express = require("express");
const taskRoute = require("./task.route")
const router = express.Router();



router.use("/task",taskRoute)


module.exports = router;

