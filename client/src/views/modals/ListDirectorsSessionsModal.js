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

import {getAllDirectorsSessions} from "../../queries/getAllDirectorsSessions.query";
import {getAllDirectorsMovies} from "../../queries/getAllDirectorsMovies.query";


const ListDirectorsSessionsModal = ({listDirectorsSessionsModal, setListDirectorsSessionsModal, setAlert}) => {
    const [username, setUsername] = useState('');
    const [response, setResponse] = useState([]);





    const handleClose = () => {
        setListDirectorsSessionsModal(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFetchDirectorsSessions = async () => {
        // Perform the API call to fetch ratings for the given username
        // Replace this with your actual API call implementation
        // For simplicity, here's a mock response
        setResponse([]);

        try {
            const data = await getAllDirectorsSessions(username);
            setResponse(data);
            // Handle successful update
            setAlert({active: true, alertType: "success", alertMessage: `Movies of ${username} is fetched successfully!`});

        } catch (error) {
            console.error("Fetch ratings error:", error);

            setAlert({active: true, alertType: "error", alertMessage: error.message});
        }

    };

    return (
        <div>
            <Dialog open={listDirectorsSessionsModal} onClose={handleClose}>
                <DialogTitle>Director's Sessions</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <Button onClick={handleFetchDirectorsSessions}>Fetch Director's Sessions</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Session ID</TableCell>
                                <TableCell>Movie ID</TableCell>
                                <TableCell>Movie Name</TableCell>
                                <TableCell>Theatre ID</TableCell>
                                <TableCell>Time Slot</TableCell>
                                <TableCell>Predecessors List</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response.map((response) => (
                                <TableRow key={response.movie_id}>
                                    <TableCell>{response.session_id}</TableCell>
                                    <TableCell>{response.movie_id}</TableCell>
                                    <TableCell>{response.movie_name}</TableCell>
                                    <TableCell>{response.theater_id}</TableCell>
                                    <TableCell>{response.time_slot}</TableCell>
                                    <TableCell>{response.predecessors.map((predecessor) => predecessor.movie_id_predecessor).toString()}</TableCell>
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

export default ListDirectorsSessionsModal;
