const mongoose = require('mongoose');


const taskSchema = mongoose.Schema(
{
title: {
    type: String, 
    required: true, 
    unique: true,

} , 
description: {
    type: String, 
    required: true, 
}, 
status: {
    type: String,
    enum: ["TODO", "INPROGRESS", "DONE", "ACHIVED"],
    default: "TODO",
  },
  linkedFile: {
    fileName: { type: String },
    fileType: {
      type: String,
      enum: [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
        'image/gif'
      ], 
    
    },
    fileBuffer: { type: Buffer }
  },
  createdOn: {
    type: Date,
    default: Date.now, 
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },

}
)

taskSchema.set("toJSON", {
    transform: function (doc, ret) {
      if (ret.linkedFile && ret.linkedFile.fileBuffer) {
        ret.linkedFile.fileBuffer = ret.linkedFile.fileBuffer.toString("base64");
      }
      return ret;
    },
  });

  
const Task =  mongoose.model("Task", taskSchema);
module.exports = Task;