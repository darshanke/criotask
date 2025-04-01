import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Modal from "@mui/material/Modal";
import BasicDatePicker from "./DatePicker";
import { MenuItem, Select, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import baseUrl from "../config/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  m: 3,
};

export default function BasicModal({
  open,
  setOpen,
  update,
  task,
  setRefreshFlag,
}) {
  const [edit, setEdit] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    deadline: dayjs(),
    status: "",
  });
  useEffect(() => {
    if (update && task) {
      // console.log(task);
      setInputField({
        title: task.title,
        description: task.description,
        deadline: dayjs(task.deadline),
        status: task.status
      });
    }
  }, [task, update]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
      setSelectedFile(null);
    }
  };

  const inputFiledUpdater = (e, field) => {
    console.log(e.target.value);
    setInputField((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };
  const submitTheData = async (e) => {
    e.preventDefault();

    if (inputField.title === "" || inputField.description === "") {
      window.alert("Please fill the mandatory fields");
      return;
    }

    if (!update) {
      try {
        let formData = new FormData();

        formData.append("title", inputField.title);
        formData.append("description", inputField.description);
        formData.append("deadline", inputField.deadline.toISOString());

        // Append file if available
        if (selectedFile) {
          formData.append("file", selectedFile);
        }

        let res = await axios.post(`${baseUrl}/task`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 201) {
          handleClose();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          window.alert("Failed to upload. Try again.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        window.alert("An error occurred. Please try again.");
      }
    } else {
      try {
        const res = await axios.put(`${baseUrl}/task/${task._id}`, {
          title: inputField.title,
          description: inputField.description,
          deadline: inputField.deadline.toISOString(),
          status: inputField.status
        });
        if (!res) {
          window.alert("something weent wrong!..");
          return;
        }
        window.alert("udpated successfully!..");
        setRefreshFlag((prev) => !prev);
        handleClose();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            sx={{ width: "100%", mt: 2, mb: 2 }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={inputField.title}
            onChange={(e) => inputFiledUpdater(e, "title")}
          />
          <TextField
            sx={{ width: "100%", mt: 2, mb: 2 }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={inputField.description}
            onChange={(e) => inputFiledUpdater(e, "description")}
          />
          <BasicDatePicker
            inputField={inputField}
            setInputField={setInputField}
          />
          {update && <Select
            value={inputField.status}
            onChange={(e)=> inputFiledUpdater(e,"status")}
            variant="outlined"
            sx={{
              minWidth: 120,
              // backgroundColor: ,
            }}
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="FAILED">FAILED</MenuItem>
          </Select>}

          <input
            type="file"
            accept="application/pdf"
            id="pdf-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="pdf-upload">
            <Button
              component="span"
              startIcon={<FileUploadIcon />}
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
            >
              UPLOAD PDF
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body1" sx={{ mt: 0 }}>
              Selected File: {selectedFile.name}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={(e) => {
                submitTheData(e);
              }}
            >
              {update ? "Update" : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
