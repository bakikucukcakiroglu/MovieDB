import React, {useContext, useEffect, useState} from 'react';
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
    CircularProgress,
    Box
} from '@mui/material';
import {getAudiencesTickets} from "../../queries/getAudiencesTickets.query";
import { AuthContext } from "../../helpers/AuthProvider";


const ListMyTicketsModal = ({ listMyTicketsModal, setListMyTicketsModal, setAlert }) => {

    const { isLoggedIn } = useContext(AuthContext);


    const [tickets, setTickets] = useState([]);
    const handleClose = () => {
        setListMyTicketsModal(false);
    };


    const  handleFetchTickets = async () => {

        try{

            const response = await getAudiencesTickets(isLoggedIn?.username);
            setAlert({active: true, alertType: "success", alertMessage: `Tickets of ${isLoggedIn.username} are fetched successfully!`});

            setTickets(response);


        }catch(error){

            console.log("Couldn't fetch sessions.");
            setAlert({active: true, alertType: "error", alertMessage: error.message })


        }
    }

    useEffect(() => {
        if(listMyTicketsModal){

            handleFetchTickets();
        }
    }, [listMyTicketsModal]);

    return (
        <div>
            <Dialog open={listMyTicketsModal} onClose={handleClose}>
                <DialogTitle>List of My Tickets</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Movie ID</TableCell>
                                <TableCell>Movie Name</TableCell>
                                <TableCell>Session ID</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Overall Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets?.map((ticket) => (
                                <TableRow key={ticket.session_id}>
                                    <TableCell>{ticket.movie_id}</TableCell>
                                    <TableCell>{ticket.movie_name}</TableCell>
                                    <TableCell>{ticket.session_id}</TableCell>
                                    <TableCell>{ticket.rating}</TableCell>
                                    <TableCell>{ticket.average_rating}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/*     )
                }*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListMyTicketsModal;
