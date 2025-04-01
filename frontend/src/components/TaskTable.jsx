import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import axios from "axios";
import baseUrl from "../config/config";

const TaskTable = () => {
  const [tableData, setTableData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const apiCall = async() =>{
    let res  = await axios.get(`${baseUrl}/task`);
    setTableData(res.data);
  }

  useEffect(() => {
    apiCall();
  }, [refreshFlag]); 

  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          borderCollapse: "collapse",
        }}
      >
        {tableData.length > 0 ? (
          <table style={{ width: "100%" }}>
            <thead style={{ width: "100%" , textAlign: "left"}}>
              <tr style={{ width: "100%" }}>
                <th style={{ width: "20%", padding: "10px" }}>Task Name</th>
                <th style={{ width: "40%", padding: "10px" }}>Description</th>
                <th style={{ width: "10%", padding: "10px" }}>Deadline</th>
                <th style={{ width: "10%", padding: "10px" }}>Status</th>
                <th style={{ width: "20%", padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ width: "100%", textAlign: "left" }}>
              {tableData.map((task, index) => (
                <TaskList key={index} task={task} setRefreshFlag ={setRefreshFlag} />
              ))}
            </tbody>
          </table>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No Tasks found
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskTable;
