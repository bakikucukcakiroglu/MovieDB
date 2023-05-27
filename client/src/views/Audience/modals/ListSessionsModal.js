import React, {useEffect, useState} from 'react';
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
import { getAllSessions } from "../../../queries/audience.queries/getAllSessions.query";

const ListSessionsModal = ({ listSessionsModal, setListSessionsModal, setAlert }) => {

    const [sessions, setSessions] = useState([]);
    const handleClose = () => {
        setListSessionsModal(false);
    };


    const  handleFetchSessions = async () => {

        try{

            const response = await getAllSessions();

            setSessions(response);


        }catch(error){

            console.log("Couldn't fetch sessions.");

        }

    }

    useEffect(() => {
        if(listSessionsModal){

            handleFetchSessions();
        }
    }, [listSessionsModal]);

    return (
        <div>
            <Dialog open={listSessionsModal} onClose={handleClose}>
                <DialogTitle>List of Sessions</DialogTitle>
                <DialogContent>
{/*                    {isLoading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (*/}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Session ID</TableCell>
                                    <TableCell>Movie ID</TableCell>
                                    <TableCell>Movie Name</TableCell>
                                    <TableCell>Director's Surname</TableCell>
                                    <TableCell>Platform ID</TableCell>
                                    <TableCell>Theater ID</TableCell>
                                    <TableCell>Time Slot</TableCell>
                                    <TableCell>Predecessor List</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sessions?.map((session) => (
                                    <TableRow key={session.username}>
                                        <TableCell>{session.session_id}</TableCell>
                                        <TableCell>{session.movie_id}</TableCell>
                                        <TableCell>{session.movie_name}</TableCell>
                                        <TableCell>{session.surname}</TableCell>
                                        <TableCell>{session.platform_id}</TableCell>
                                        <TableCell>{session.theater_id}</TableCell>
                                        <TableCell>{session.time_slot}</TableCell>
                                        <TableCell>{session.predecessors.map((predecessor)=> predecessor.movie_id_predecessor).toString()}</TableCell>
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

export default ListSessionsModal;
