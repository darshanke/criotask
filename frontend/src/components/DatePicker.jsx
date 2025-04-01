import * as React from "react";
import dayjs from "dayjs"; // Import Day.js
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ inputField, setInputField }) {
  // Handle Date Change (Fix: No event, only value)
  const handleDateChange = (newValue) => {
    setInputField((prevState) => ({
      ...prevState,
      deadline: newValue, // Store as Day.js object
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Deadline"
        sx={{ width: "100%", mt: 3, mb: 3 }}
        value={inputField.deadline || dayjs()} // ✅ Default to today
        onChange={handleDateChange} // ✅ Correct handler
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -20],
                },
              },
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ],
          },
        }}
        PopperProps={{
          disablePortal: true,
          sx: { zIndex: 1500 },
        }}
      />
    </LocalizationProvider>
  );
}
