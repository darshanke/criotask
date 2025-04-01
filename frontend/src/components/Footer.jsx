import { Box, Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const Footer = ({ setOpen }) => {
  const modalWindowOpen = (e) => {
    setOpen(true);
  };
  return (
    <Box
      sx={{
        height: "50",
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        variant="text"
        sx={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          height: "3rem",
          width: "3rem",
          minWidth: "3rem",
          borderRadius: "50%",
          bgcolor: "primary.main",
        }}
        onClick={modalWindowOpen}
      >
        <AddIcon sx={{ color: "primary.text" }} />
      </Button>
    </Box>
  );
};

export default Footer;
