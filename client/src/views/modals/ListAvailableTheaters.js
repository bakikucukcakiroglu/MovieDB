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

import {getAvailableTheaters} from "../../queries/getAvailableTheaters.query";


const ListAvailableTheatersModal = ({listAvailableTheatersModal, setListAvailableTheatersModal, setAlert}) => {
    const [date, setDate] = useState('');
    const [slot, setSlot] = useState('');
    const [response, setResponse] = useState([]);





    const handleClose = () => {
        setListAvailableTheatersModal(false);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSlotChange = (event) => {
        setSlot(event.target.value);
    };

    const handleFetchAvailableTheaters = async () => {
        // Perform the API call to fetch ratings for the given username
        // Replace this with your actual API call implementation
        // For simplicity, here's a mock response
        setResponse([]);

        try{

            const data = await getAvailableTheaters(date, slot);

            console.log("data", data);

            setResponse(data);

        }catch(error){

            console.error("Fetch available theaters error:", error);

        }

    };

    return (
        <div>
            <Dialog open={listAvailableTheatersModal} onClose={handleClose}>
                <DialogTitle>Available Theaters</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Date"
                        value={date}
                        onChange={handleDateChange}
                    />
                    <TextField
                        label="Slot"
                        value={slot}
                        onChange={handleSlotChange}
                    />
                    <Button onClick={handleFetchAvailableTheaters}>Fetch Available Theaters</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Theatre ID</TableCell>
                                <TableCell>Theater Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response.map((response) => (
                                <TableRow key={response.theater_id}>
                                    <TableCell>{response.theater_id}</TableCell>
                                    <TableCell>{response.theater_name}</TableCell>
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

export default ListAvailableTheatersModal;
