import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { updateMovie } from "../../queries/updateMovie.query";
import { AuthContext } from '../../helpers/AuthProvider';

const UpdateMovieModal = ({ updateMovieModal, setUpdateMovieModal, setAlert }) => {

    const { isLoggedIn } = useContext(AuthContext);

  const [movieId, setMovieId] = useState('');
  const [movieName, setMovieName] = useState('');

  const handleClose = () => {
    setUpdateMovieModal(false);
    setMovieId('');
    setMovieName('');
  };

  const handleUpdate = async () => {
    // Perform the update action using the movieId and movieName values
    console.log('Movie ID:', movieId);
    console.log('Movie Name:', movieName);

    const payload = {
      movie_id: movieId,
      movie_name: movieName,
      director_username: isLoggedIn?.username
    };

    try {
      await updateMovie(payload);
      // Handle successful update
      setAlert({ active: true, alertType: 'success', alertMessage: `Movie ${movieId} is updated successfully!` });
    } catch (error) {
      console.error('Update movie error:', error);
      setAlert({ active: true, alertType: 'error', alertMessage: error.message });
    }

    // Reset the form and close the modal
    setMovieId('');
    setMovieName('');
    setUpdateMovieModal(false);
  };

  return (
    <div>
      <Dialog open={updateMovieModal} onClose={handleClose}>
        <DialogTitle>Update Movie</DialogTitle>
        <DialogContent>
          <TextField
            label="Movie ID"
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Movie Name"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateMovieModal;
