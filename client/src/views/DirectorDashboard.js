import React, {useState} from 'react';
import {
    Grid, Card, CardContent,
    Typography,
    Alert, Snackbar,
} from '@mui/material';
import './Home.css';
import AddMovieModal from "./modals/AddMovieModal";
import AddSessionModal from "./modals/AddSessionModal";
import AddPredecessorModal from "./modals/AddPredecessorModal";
import ListDirectorsSessionsModal from './modals/ListDirectorsSessionsModal';
import UpdateMovieModal from './modals/UpdateMovieModal';
import ListAudienceModal from './modals/ListAudienceModal';


const DirectorDashboard= () => {

    const [alert, setAlert] = useState({active:false, alertType: "error", alertMessage:""})


    const [addMovieModal, setAddMovieModal] = useState(false);

    const handleAddMovieModalOpen = () => {

        setAddMovieModal(true);
    }

    const [addSessionModal, setAddSessionModal] = useState(false);

    const handleAddSessionModalOpen = () => {

        setAddSessionModal(true);
    }

    const [addPredecessorModal, setAddPredecessorModal] = useState(false);

    const handleAddPredecessorModalOpen = () => {

        setAddPredecessorModal(true);
    }

    const [listDirectorsSessionsModal, setListDirectorsSessionsModal] = useState(false);

    const handleListDirectorsSessionsModalOpen = () => {

        setListDirectorsSessionsModal(true);
    }

    const [updateMovieModal, setUpdateMovieModal] = useState(false);

    const handleOpenUpdateMovieModal = () => {
        setUpdateMovieModal(true);
    };

    const [getAllAudienceModal, setGetAllAudienceModal] = useState(false);

    const handleOpenGetAudienceModal = () => {
        setGetAllAudienceModal(true);
    };



    const actionsOfManager = [
        {
            label: "List Available Theatres",
            description: "List all theatres available for a given slot.",
            func: () => {
                console.log("Add User Clicked!");
            },
        },
        {
            label: "Add Movie",
            description: 'Add a new movie directed by me.',
            func: () => {
                console.log("Delete Audience Clicked!");
                handleAddMovieModalOpen();
            },
        },
        {
            label: "Add Movie Session",
            description: 'Add a new movie session for a movie directed by me.',
            func: () => {
                console.log("Delete Audience Clicked!");
                handleAddSessionModalOpen();
            },
        },
        {
            label: "Add Predecessor",
            description: "Add predecessor(s) to a movie",
            func: () => {
                console.log("Update Director Clicked!");
                handleAddPredecessorModalOpen();
            },
        },
        {
            label: "List My Movies",
            description: "View all movies directed by me.",
            func: () => {
                console.log("List Directors Clicked!");
                handleListDirectorsSessionsModalOpen();
            },
        },
        {
            label: "My Movie's Audiences",
            description: "View all audiences who bought a ticket for a specific movie directed by me",
            func: () => {
                console.log("Audience's Ratings Clicked!");
                handleOpenGetAudienceModal();
            },
        },
        {
            label: "Update My Movie",
            description: "Update the name of a movie directed by me",
            func: () => {
                console.log("Director's Movies Clicked!"); 
                handleOpenUpdateMovieModal();
            },
        },
    ];

    const handleCloseSnackbar = () => {

        setAlert({...alert, active: false });
    }

    return (
        <Grid container spacing={1}>
            <Snackbar open={alert.active} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert severity={alert.alertType}>{alert.alertMessage}</Alert>
            </Snackbar>
            <AddMovieModal addMovieModal={addMovieModal} setAddMovieModal={setAddMovieModal} setAlert={setAlert} ></AddMovieModal>
            <AddSessionModal addMovieSessionModal={addSessionModal} setAddMovieSessionModal={setAddSessionModal} setAlert={setAlert} ></AddSessionModal>
            <AddPredecessorModal addPredecessorModal={addPredecessorModal} setAddPredecessorModal={setAddPredecessorModal} setAlert={setAlert} ></AddPredecessorModal>
            <ListDirectorsSessionsModal listDirectorsSessionsModal={listDirectorsSessionsModal} setListDirectorsSessionsModal={setListDirectorsSessionsModal} setAlert={setAlert} ></ListDirectorsSessionsModal>
            <ListAudienceModal listAudienceModal={getAllAudienceModal} setListAudienceModal={setGetAllAudienceModal} setAlert={setAlert} ></ListAudienceModal>
            <UpdateMovieModal updateMovieModal={updateMovieModal} setUpdateMovieModal={setUpdateMovieModal} setAlert={setAlert} ></UpdateMovieModal>
            {actionsOfManager.map((action , index) =>
                <Grid key={index} item xs={6} sm={4} md={3}>
                    <Card className="dashboard-card" onClick={action.func}>
                        <CardContent className="home-card-content">
                            <Typography variant="h6" className="card-item">{action.label}</Typography>

                            <Typography style={{textAlign:"center" , color :"gray"}} className="card-item">{action.description}</Typography>

                        </CardContent>
                    </Card>
                </Grid>)
            }
        </Grid>
    );
};

export default DirectorDashboard;