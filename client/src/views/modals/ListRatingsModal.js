import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
} from '@mui/material';

import {getRatingsOfAudienceByUsername} from "../../queries/getRatingsOfAudience.query";
import {useQuery} from "react-query";
import {getAllDirectors} from "../../queries/getAllDirectors.query";
import {updateDirectorPlatform} from "../../queries/updateDirector.query";

const ListRatingsModal = ({listRatingsModal, setListRatingsModal, setAlert}) => {
    const [username, setUsername] = useState('');
    const [ratings, setRatings] = useState([]);


    const handleClose = () => {
        setListRatingsModal(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFetchRatings = async () => {
        // Perform the API call to fetch ratings for the given username
        // Replace this with your actual API call implementation
        // For simplicity, here's a mock response

        setRatings([]);

        try {
            const data = await getRatingsOfAudienceByUsername(username);
            setRatings(data);
            // Handle successful update
            setAlert({active: true, alertType: "success", alertMessage: `Ratings of ${username} is fetched successfully!`});

        } catch (error) {
            console.error("Fetch ratings error:", error);

            setAlert({active: true, alertType: "error", alertMessage: error.message});

        }

    };

    return (
        <div>
            <Dialog open={listRatingsModal} onClose={handleClose}>
                <DialogTitle>Rating List</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Button onClick={handleFetchRatings}>Fetch Ratings</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Movie ID</TableCell>
                                <TableCell>Movie Name</TableCell>
                                <TableCell>Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ratings.map((rating) => (
                                <TableRow key={rating.movie_id}>
                                    <TableCell>{rating.movie_id}</TableCell>
                                    <TableCell>{rating.movie_name}</TableCell>
                                    <TableCell>{rating.rating}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListRatingsModal;
