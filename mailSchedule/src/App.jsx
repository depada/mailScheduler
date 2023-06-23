import React, { useState } from "react";
import "./App.css";
import {
  TextField,
  Select,
  MenuItem,
  Box,
  Button,
  InputLabel,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const App = () => {
  const [mail, setMail] = useState("");
  const [scheduleDay, setScheduleDay] = useState("");
  const [date, setDate] = useState("");

  const handleMailChange = (e) => {
    const { value } = e.target;
    setMail(value);
  };

  const handleScheduleChange = (e) => {
    const { value } = e.target;
    setScheduleDay(value);
  };

  const handleSubmit = () => {
    fetch("http://localhost:3001/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toMail: mail,
        // subject: subject,
        filePath:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
        schedule: { day: scheduleDay, date: date && date.date() },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("error ==>", err));
  };

  const dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        height: "25vh",
        minWidth: "15vw",
      }}
    >
      <Box sx={{ mb: "10px" }}>
        <InputLabel>E-Mail</InputLabel>
        <TextField
          sx={{ textAlign: "center", width: "100%" }}
          value={mail}
          onChange={handleMailChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: "10px",
        }}
      >
        <Box sx={{ mr: "10px" }}>
          <InputLabel>Schedule</InputLabel>
          <Select
            disabled={date}
            value={scheduleDay}
            defaultValue="Sunday"
            onChange={handleScheduleChange}
            sx={{ width: "10vw" }}
          >
            {dayArr.map((day) => (
              <MenuItem value={day}>{day}</MenuItem>
            ))}
          </Select>
        </Box>

        <Typography sx={{ mt: "20px" }}>Or</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", ml: "10px" }}>
          <InputLabel>Select a Date</InputLabel>
          <DatePicker
            disabled={scheduleDay}
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
            width: "50%",
            mt: "10px",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              border: "1px black solid",
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
            mt: "10px",
            ml: "10px",
            width: "50%",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
              border: "1px black solid",
            },
          }}
          onClick={() => {
            setScheduleDay("");
            setDate("");
          }}
        >
          Clear Schedule
        </Button>
      </Box>
    </Box>
  );
};

export default App;
