import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { addMovieSession } from "../../queries/addSession.query";
import { AuthContext } from "../../helpers/AuthProvider";

const AddMovieSessionModal = ({
  addMovieSessionModal,
  setAddMovieSessionModal,
  setAlert
}) => {
  const [sessionId, setSessionId] = useState("");
  const [movieId, setMovieId] = useState("");
  const [theaterId, setTheaterId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  const handleAddMovieSessionModalClose = () => {
    setAddMovieSessionModal(false);
    setSessionId("");
    setMovieId("");
    setTheaterId("");
    setDate("");
    setTimeSlot("");
  };

  const handleAddMovieSessionSubmit = async () => {
    console.log("Add Movie Session Form Submitted!");
    console.log("Session ID:", sessionId);
    console.log("Movie ID:", movieId);
    console.log("Theater ID:", theaterId);
    console.log("Date:", date);
    console.log("Time Slot:", timeSlot);

    const movieSession = {
      session_id: sessionId.length ? sessionId : null,
      movie_id: movieId.length ? movieId : null,
      theater_id: theaterId.length ? theaterId : null,
      date_: date.length ? date : null,
      time_slot: timeSlot.length ? timeSlot : null
    };

    try {
      const data = await addMovieSession(movieSession);
      console.log("Movie Session data", data);
      setAlert({
        active: true,
        alertType: "success",
        alertMessage: `Movie session with ID ${sessionId} is saved successfully!`
      });
    } catch (error) {
      console.error("Create movie session error:", error);
      setAlert({
        active: true,
        alertType: "error",
        alertMessage: `Movie session with ID ${sessionId} couldn't be saved!`
      });
    }

    setSessionId("");
    setMovieId("");
    setTheaterId("");
    setDate("");
    setTimeSlot("");

    handleAddMovieSessionModalClose();
  };

  const handleSessionIdChange = (event) => {
    setSessionId(event.target.value);
  };

  const handleMovieIdChange = (event) => {
    setMovieId(event.target.value);
  };

  const handleTheaterIdChange = (event) => {
    setTheaterId(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeSlotChange = (event) => {
    setTimeSlot(event.target.value);
  };

  return (
    <Dialog
      open={addMovieSessionModal}
      onClose={handleAddMovieSessionModalClose}
    >
      <DialogTitle>Add Movie Session</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Session ID"
              value={sessionId}
              onChange={handleSessionIdChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Movie ID"
              value={movieId}
              onChange={handleMovieIdChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Theater ID"
              value={theaterId}
              onChange={handleTheaterIdChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              value={date}
              onChange={handleDateChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Time Slot"
              value={timeSlot}
              onChange={handleTimeSlotChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddMovieSessionModalClose}>Cancel</Button>
        <Button onClick={handleAddMovieSessionSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMovieSessionModal;
