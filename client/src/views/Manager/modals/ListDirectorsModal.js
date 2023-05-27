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
import { getAllDirectors } from "../../../queries/manager.queries/getAllDirectors.query";
import { useQuery } from "react-query";

const ListDirectorsModal = ({ listDirectorsModal, setListDirectorsModal, setAlert }) => {

    const [directors, setDirectors] = useState([]);
    const handleClose = () => {
        setListDirectorsModal(false);
    };


    const  handleFetchDirectors = async () => {

        try{

            const response = await getAllDirectors();

            setDirectors(response);


        }catch(error){

            console.log("Couldn't fetch directors.");

        }

    }

    useEffect(() => {
        if(listDirectorsModal){

            handleFetchDirectors();
        }
    }, [listDirectorsModal]);

    return (
        <div>
            <Dialog open={listDirectorsModal} onClose={handleClose}>
                <DialogTitle>List of Directors</DialogTitle>
                <DialogContent>
{/*                    {isLoading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (*/}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Nation</TableCell>
                                    <TableCell>Platform ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {directors?.map((director) => (
                                    <TableRow key={director.username}>
                                        <TableCell>{director.username}</TableCell>
                                        <TableCell>{director.name_}</TableCell>
                                        <TableCell>{director.surname}</TableCell>
                                        <TableCell>{director.nationality}</TableCell>
                                        <TableCell>{director.platform_id}</TableCell>
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

export default ListDirectorsModal;
