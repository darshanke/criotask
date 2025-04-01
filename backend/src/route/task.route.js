const express = require("express");
const upload = require("../middlewares/multer"); 
const router = express.Router();
const {Task} =  require("../controller");

router.post("/",upload.single("file"),  Task.addTask);
router.get("/", Task.getTask);
router.put("/:id",upload.single("file"), Task.upadateTask);
router.delete("/:id", Task.deleteTask);




module.exports = router;