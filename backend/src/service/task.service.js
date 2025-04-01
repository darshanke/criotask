const {Task} = require("../model");
const { ApiError } = require("../utility/ApiError");
const { commonErrorHandler } = require("../utility/CommonErrorHandler");
const { TASK_ALREADY_EXIST } = require("../utility/Message");


const addTask = async(taskBody,file)=>{
    if (file) {
        taskBody.linkedFile = {
            fileName: file.originalname,
            fileType: file.mimetype,
            fileBuffer: file.buffer, 
        };
    }

    try {
        let title = await Task.findOne({title: taskBody.title})
        if(title){
            return; 
        }
        let newTask = await Task.create(taskBody);
        return newTask;
    } catch (err) {
       console.log(err);
    }
}
const getTask = async()=>{
    let tasks = await Task.find({}).lean();
    tasks = tasks.map(task => {
        if (task.linkedFile && task.linkedFile.fileBuffer) {
            task.linkedFile.fileBuffer = task.linkedFile.fileBuffer.toString('base64');
        }
        return task;
    });
   
    return tasks;
}
const updateTask =async(id,body, file)=>{
    
    let task  =  await Task.find({_id: id});
    if(!task){
        throw new ApiError(401,"task doesn't exist");
    }
    if (file) {
        body.linkedFile = {
            fileName: file.originalname,
            fileType: file.mimetype,
            fileBuffer: file.buffer, 
        };
    }
    let title =await Task.findOne({ title: body.title, _id: { $ne: id } });
    if(title){
       return commonErrorHandler(TASK_ALREADY_EXIST);
    }
    let updatedTask  = await Task.findOneAndUpdate({_id: id}, body, {new: true,});
    return updatedTask;
}
const deleteTask=async(id)=>{
    let task  =  await Task.findOneAndDelete({_id: id});
    if(!task){
        throw new ApiError("task doesn't exist");
    }
    return task;
}
module.exports = {
    addTask, 
    deleteTask,
    updateTask, 
    getTask
}

