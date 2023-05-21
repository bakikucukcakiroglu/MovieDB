import React, {useState} from 'react';
import {
    Grid, Card, CardContent,
    Typography,
    Alert, Snackbar,
} from '@mui/material';
import './Home.css';
import DirectorUpdateModal from "./modals/updateDirectorModal";
import AddUserModal from "./modals/addUserModal";
import DeleteAudienceModal from "./modals/deleteAudienceModal";
import ListDirectorsModal from "./modals/ListDirectorsModal";
import ListRatingsModal from "./modals/ListRatingsModal";
import AddMovieModal from "./modals/AddMovieModal";

const DirectorDashboard= () => {

    const [alert, setAlert] = useState({active:false, alertType: "error", alertMessage:""})

    const [directorUpdateModal, setDirectorUpdateModal] = useState(false);
    const handleOpenDirectorUpdateModal = () => {
        setDirectorUpdateModal(true);
    };

    const [addUserModal, setAddUserModal] = useState(false);

    const handleAddUserModalOpen = () => {
        setAddUserModal(true);
    };

    const [deleteAudienceModal, setDeleteAudienceModal] = useState(false);

    const handleDeleteAudienceModalOpen = () => {
        setDeleteAudienceModal(true);
    };

    const [listDirectorsModal, setListDirectorsModal] = useState(false);

    const handleListDirectorsModalOpen = () => {
        setListDirectorsModal(true);
    };

    const [listRatingsModal, setListRatingsModal] = useState(false);
    const handleListRatingsModalOpen = () => {
        setListRatingsModal(true);
    };


    const [addMovieModal, setAddMovieModal] = useState(false);

    const handleAddMovieModalOpen = () => {

        setAddMovieModal(true);
    }


    const actionsOfManager = [
        {
            label: "List Available Theatres",
            description: "List all theatres available for a given slot.",
            func: () => {
                console.log("Add User Clicked!");
                handleAddUserModalOpen();
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
                handleDeleteAudienceModalOpen();
            },
        },
        {
            label: "Add Predecessor",
            description: "Add predecessor(s) to a movie",
            func: () => {
                console.log("Update Director Clicked!");
                handleOpenDirectorUpdateModal();
            },
        },
        {
            label: "List My Movies",
            description: "View all movies directed by me.",
            func: () => {
                console.log("List Directors Clicked!");
                handleListDirectorsModalOpen();
            },
        },
        {
            label: "My Movie's Audiences",
            description: "View all audiences who bought a ticket for a specific movie directed by me",
            func: () => {
                console.log("Audience's Ratings Clicked!");
                handleListRatingsModalOpen();
            },
        },
        {
            label: "Update My Movie",
            description: "Update the name of a movie directed by me",
            func: () => {
                console.log("Director's Movies Clicked!");
            },
        },
    ];

    const handleCloseSnackbar = () => {

        setAlert({active: false, alertType: "error", alertMessage: ""});
    }

    return (
        <Grid container spacing={1}>
            <Snackbar open={alert.active} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert severity={alert.alertType}>{alert.alertMessage}</Alert>
            </Snackbar>
            <AddMovieModal addMovieModal={addMovieModal} setAddMovieModal={setAddMovieModal} setAlert={setAlert} ></AddMovieModal>
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