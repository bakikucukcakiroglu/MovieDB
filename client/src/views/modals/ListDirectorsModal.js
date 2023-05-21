import React, { useEffect } from 'react';
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
import { getAllDirectors } from "../../queries/getAllDirectors.query";
import { useQuery } from "react-query";

const ListDirectorsModal = ({ listDirectorsModal, setListDirectorsModal, setAlert }) => {
    const { data, isLoading, isError, error, refetch } = useQuery('directors', getAllDirectors, {refetchOnMount:false, refetchOnWindowFocus:false});

    const handleClose = () => {
        setListDirectorsModal(false);
    };

    useEffect(() => {
        if(listDirectorsModal){
            refetch();
        }
    }, [listDirectorsModal]);

    return (
        <div>
            <Dialog open={listDirectorsModal} onClose={handleClose}>
                <DialogTitle>List of Directors</DialogTitle>
                <DialogContent>
                    {isLoading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
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
                                {data?.map((director) => (
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
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ListDirectorsModal;
