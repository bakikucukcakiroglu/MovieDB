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
import React, {useContext, useState} from "react";
import {addMovie} from "../../queries/addMovie.query";

import {AuthContext} from "../../helpers/AuthProvider";

const AddMovieModal = ({ addMovieModal, setAddMovieModal, setAlert }) => {
    const [movieId, setMovieId] = useState("");
    const [movieName, setMovieName] = useState("");
    const [duration, setDuration] = useState("");
    const [averageRating, setAverageRating] = useState("");

    const { isLoggedIn } = useContext(AuthContext);


    const handleAddMovieModalClose = () => {
        setAddMovieModal(false);
        setMovieId("");
        setMovieName("");
        setDuration("");
        setAverageRating("");
    };

    const handleAddMovieSubmit = async () => {
        console.log("Add User Form Submitted!");
        console.log("Movie ID:", movieId);
        console.log("Movie Name:", movieName);
        console.log("Duration:", duration);
        console.log("Average Rating:", averageRating);

        const movie = {
            movie_id: movieId.length ? movieId : null,
            movie_name: movieName.length ? movieName : null,
            duration: duration.length ? duration : null,
            director_username: isLoggedIn?.username,
            average_rating: averageRating.length ? averageRating : null
        };

        try {
            const data = await addMovie(movie);
            console.log("Movie data", data);
            setAlert({
                active: true,
                alertType: "success",
                alertMessage: `Movie with ID ${movieId} is saved successfully!`
            });
        } catch (error) {
            console.error("Create movie error:", error);
            setAlert({
                active: true,
                alertType: "error",
                alertMessage: `Movie with ID ${movieId} couldn't be saved!`
            });
        }

        setMovieId("");
        setMovieName("");
        setDuration("");
        setAverageRating("");

        handleAddMovieModalClose();
    };

    const handleMovieIdChange = (event) => {
        setMovieId(event.target.value);
    };

    const handleMovieNameChange = (event) => {
        setMovieName(event.target.value);
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    const handleAverageRatingChange = (event) => {
        setAverageRating(event.target.value);
    };

    return (
        <Dialog open={addMovieModal} onClose={handleAddMovieModalClose}>
            <DialogTitle>Add Movie</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
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
                            label="Movie Name"
                            value={movieName}
                            onChange={handleMovieNameChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Duration"
                            value={duration}
                            onChange={handleDurationChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Director Username"
                            value={isLoggedIn?.username}
                            disabled={true}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Average Rating"
                            value={averageRating}
                            onChange={handleAverageRatingChange}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddMovieModalClose}>Cancel</Button>
                <Button onClick={handleAddMovieSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMovieModal;
