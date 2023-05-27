import React, {useEffect, useState, useContext} from 'react';
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
    CircularProgress,
    Box
} from '@mui/material';
import { getAllAudience } from "../../../queries/director.queries/getAllAudience.query";
import { AuthContext } from '../../../helpers/AuthProvider';

const ListAudienceModal = ({ listAudienceModal, setListAudienceModal, setAlert }) => {

    const { isLoggedIn} = useContext(AuthContext);


    const [audience, setAudience] = useState([]);
    const handleClose = () => {
        setListAudienceModal(false);
    };

    const [movieId, setMovieId] = useState(null);


    const  handleFetchAudience = async () => {

        setAudience([]);

        try{

            const payload = {

                movie_id : movieId,
                director_username: isLoggedIn?.username
            }

            const response = await getAllAudience(payload);

            setAudience(response);
            setAlert({active: true, alertType: "success", alertMessage: `Audience of ${movieId} fetched successfully!`});



        }catch(error){

            console.log("Couldn't fetch audience.");
            setAlert({active: true, alertType: "error", alertMessage: error.message});


        }

    }


    return (
        <div>
            <Dialog open={listAudienceModal} onClose={handleClose}>
                <DialogTitle>List of Audience</DialogTitle>
                <DialogContent>
{/*                    {isLoading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (*/}
                    <TextField
                        label="Movie ID"
                        value={movieId}
                        onChange={(e) => { setMovieId(e.target.value)}}
                    />
                    <Button onClick={handleFetchAudience}>Fetch Movie's Audience</Button>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Surname</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {audience?.map((audience) => (
                                    <TableRow key={audience.username}>
                                        <TableCell>{audience.username}</TableCell>
                                        <TableCell>{audience.name_}</TableCell>
                                        <TableCell>{audience.surname}</TableCell>
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

export default ListAudienceModal;
