import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
} from '@mui/material';

import {getAverageRating} from "../../queries/getAverageRating.query";

const ListMovieRatingModal = ({listMovieRatingModal, setListMovieRatingModal, setAlert}) => {
    const [movie, setMovie] = useState('');
    const [response, setResponse] = useState([]);

    const handleClose = () => {
        setListMovieRatingModal(false);
    };

    const handleMovieChange = (event) => {
        setMovie(event.target.value);
    };

    const handleFetchAverageRating = async () => {
        // Perform the API call to fetch ratings for the given username
        // Replace this with your actual API call implementation
        // For simplicity, here's a mock response
        setResponse(null);

        try{

            const data = await getAverageRating(movie);

            setResponse(data);
            setAlert({active: true, alertType: "success", alertMessage: `Rating of ${movie} fetched successfully!`});

        }catch(error){

            console.error("Fetch ratings error:", error);
            setAlert({active: true, alertType: "error", alertMessage: error.message});

        }

    };

    return (
        <div>
            <Dialog open={listMovieRatingModal} onClose={handleClose}>
                <DialogTitle>Movie's Average Rating</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Movie ID"
                        value={movie}
                        onChange={handleMovieChange}
                    />
                    <Button onClick={handleFetchAverageRating}>Fetch Movie's Average Rating</Button>
                    <Typography>Average Rating : {response?.average_rating}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListMovieRatingModal;