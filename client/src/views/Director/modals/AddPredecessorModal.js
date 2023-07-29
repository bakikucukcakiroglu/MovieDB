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
import { addPredecessor } from "../../../queries/director.queries/addPredecessor.query";
import { AuthContext } from "../../../helpers/AuthProvider";

const AddPredecessorModal = ({
  addPredecessorModal,
  setAddPredecessorModal,
  setAlert
}) => {
  const [movieIdPredecessor, setMovieIdPredecessor] = useState("");
  const [movieIdSuccessor, setMovieIdSuccessor] = useState("");

  const { isLoggedIn } = useContext(AuthContext);

  const handleAddPredecessorModalClose = () => {
    setAddPredecessorModal(false);
    setMovieIdPredecessor("");
    setMovieIdSuccessor("");
  };

  const handleAddPredecessorSubmit = async () => {
    console.log("Add Predecessor Form Submitted!");
    console.log("Predecessor Movie ID:", movieIdPredecessor);
    console.log("Successor Movie ID:", movieIdSuccessor);

    const predecessorData = {
      movie_id_predecessor: movieIdPredecessor.length ? movieIdPredecessor : null,
      movie_id_successor: movieIdSuccessor.length ? movieIdSuccessor : null,
    };

    try {
      const data = await addPredecessor(predecessorData);
      console.log("Predecessor data", data);
      setAlert({
        active: true,
        alertType: "success",
        alertMessage: `Predecessor relationship between movies ${movieIdPredecessor} and ${movieIdSuccessor} is saved successfully!`
      });
    } catch (error) {
      console.error("Create predecessor error:", error);
      setAlert({
        active: true,
        alertType: "error",
        alertMessage: error.message
      });
    }

    setMovieIdPredecessor("");
    setMovieIdSuccessor("");

    handleAddPredecessorModalClose();
  };

  const handleMovieIdPredecessorChange = (event) => {
    setMovieIdPredecessor(event.target.value);
  };

  const handleMovieIdSuccessorChange = (event) => {
    setMovieIdSuccessor(event.target.value);
  };

  return (
    <Dialog
      open={addPredecessorModal}
      onClose={handleAddPredecessorModalClose}
    >
      <DialogTitle>Add Predecessor</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Predecessor Movie ID"
              value={movieIdPredecessor}
              onChange={handleMovieIdPredecessorChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Successor Movie ID"
              value={movieIdSuccessor}
              onChange={handleMovieIdSuccessorChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddPredecessorModalClose}>Cancel</Button>
        <Button onClick={handleAddPredecessorSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPredecessorModal;
