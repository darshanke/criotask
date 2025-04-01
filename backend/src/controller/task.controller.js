const {Taskservice} = require("../service");
const { ApiError , errorHandler} = require("../utility/ApiError");
const { commonErrorHandler } = require("../utility/CommonErrorHandler");
const { TASK_NOT_CREATED } = require("../utility/Message");
const addTask =async(req, res,next)=>{
    try {
        const file = req.file;
        const task = await Taskservice.addTask(req.body, file);
        if (!task) {
            res.status(404).
            send(commonErrorHandler(TASK_NOT_CREATED));
        }
        res.status(201).send(task);
    } catch (err) {
        console.log(err);
    }
}
const getTask = async(req,res)=>{

    let allTask = await Taskservice.getTask();
    res.status(200).send(allTask);
}
const upadateTask = async(req,res)=>{
    const {id} = req.params;
    const file = req.file;
  
    let updatedTask = await Taskservice.updateTask(id,req.body, file);
    console.log(updatedTask);
    if(!updatedTask){
        res.status(200).
        send(commonErrorHandler(TASK_ALREADY_EXIST));
    }
    res.status(200).send(updatedTask);
}
const deleteTask = async(req,res)=>{
    const {id} = req.params;
    let deletedTask = await Taskservice.deleteTask(id);
    res.status(204).send("Deleted successfully");
}




module.exports ={
    addTask, 
    getTask, 
    upadateTask, 
    deleteTask

}