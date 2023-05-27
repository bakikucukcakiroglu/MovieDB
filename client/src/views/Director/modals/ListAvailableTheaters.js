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

import {getAvailableTheaters} from "../../../queries/director.queries/getAvailableTheaters.query";
import {addPredecessor} from "../../../queries/director.queries/addPredecessor.query";


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

        try {
            const data = await getAvailableTheaters(date, slot);
            setResponse(data);

            console.log("data", data);
            setAlert({
                active: true,
                alertType: "success",
                alertMessage: `Fetched all available theater for date: ${date} and slot: ${slot}  successfully!`
            });
        } catch (error) {
            setAlert({
                active: true,
                alertType: "error",
                alertMessage: error.message
            });
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
                                <TableCell>Theater District</TableCell>
                                <TableCell>Theater Capacity</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response.map((response) => {

                                if (response.theater_id) {
                                    return <TableRow key={response.theater_id}>
                                        <TableCell>{response.theater_id}</TableCell>
                                        <TableCell>{response.theater_name}</TableCell>
                                        <TableCell>{response.theater_district}</TableCell>
                                        <TableCell>{response.theater_capacity}</TableCell>
                                    </TableRow>
                                }
                            })}
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
