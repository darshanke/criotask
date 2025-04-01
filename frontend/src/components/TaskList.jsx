import React, { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import axios from "axios";
import baseUrl from "../config/config";
import BasicModal from "./ModalWindow";
import { Select, MenuItem } from "@mui/material";

const TaskList = ({ task , setRefreshFlag }) => {
  const [open, setOpen] = useState(false);
useEffect(()=>{

},[task])
  const deleteTask =async (id)=>{
   try{
    const res = await axios.delete(`${baseUrl}/task/${id}`);
    if(!res){
      window.alert("something went wrong")
    }else{
      window.alert("Task Deleted Successfully!..")
      setRefreshFlag((prev) => !prev);  
    }
   }catch(e){
    console.log(e);
   }

  }

  const theme = useTheme();
  return (
    <tr
      style={{
        borderBottom: `30px solid ${theme.palette.primary.main}`,
        height: "40px",
      }}
    >
      <td style={{ padding: "10px" }}>{task.title}</td>
      <td style={{ padding: "10px" }}>{task.description}</td>
      <td style={{ padding: "10px", display: 'flex', flexDirection: 'column',  }}>
        <div>{task.deadline.split("T")[0]}</div> 
         <div>{task.deadline.split("T")[0]> new Date()?"failed":task.status}</div> 
         
        </td>   
      <td style={{ padding: "10px" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor:
              theme.palette[task.status === "DONE" ? "success" : "warning"]
                .main,
          }}
        >
          {task.status}
        </Button>
      </td>
      <td
        style={{
          padding: "10px",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {task.status !== "TODO" ? (
          <DownloadIcon sx={{ color: "primary.main" }} onClick={() => {}} />
        ) : (
          <CheckCircleRoundedIcon sx={{ color: "primary.success" }} />
        )}
        <EditIcon sx={{ color: "primary.edit" }} onClick={()=>setOpen(!open)} />
        <DeleteIcon sx={{ color: "primary.delete" , cursor : 'pointer' }} onClick={() => {deleteTask(task._id)}} />
      </td>
     <BasicModal open={open} setOpen={setOpen} update task={task} setRefreshFlag={setRefreshFlag}/>
    </tr>
  );
};

export default TaskList;
