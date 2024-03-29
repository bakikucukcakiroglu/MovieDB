

import React, {useState} from 'react';
import {
    Grid, Card, CardContent,
    Typography,
    Alert, Snackbar,
} from '@mui/material';
import '../Home.css';
import DirectorUpdateModal from "./modals/UpdateDirectorModal";
import AddUserModal from "./modals/AddUserModal";
import DeleteAudienceModal from "./modals/DeleteAudienceModal";
import ListDirectorsModal from "./modals/ListDirectorsModal";
import ListRatingsModal from "./modals/ListRatingsModal";
import ListDirectorsMoviesModal from "./modals/ListDirectorsMoviesModal";
import ListMovieRatingModal from "./modals/ListMovieRatingModal";
import AddTheaterModal from "./modals/AddTheaterModal";

const ManagerDashboard = () => {

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


    const [listDirectorsMoviesModal, setListDirectorsMoviesModal] = useState(false);
    const handleListDirectorsMoviesModalOpen = () => {
        setListDirectorsMoviesModal(true);
    };




    const [listMovieRatingModal, setListMovieRatingModal] = useState(false);
    const handleListMovieRatingModalOpen = () => {
        setListMovieRatingModal(true);
    };


    const [addTheaterModal, setAddTheaterModal] = useState(false);
    const handleAddTheaterModalOpen = () => {
        setAddTheaterModal(true);
    };




    const actionsOfManager = [
        {
            label: "Add User",
            description: "Add a new audience or director",
            func: () => {
                console.log("Add User Clicked!");
                handleAddUserModalOpen();
            },
        },
        {
            label: "Delete Audience",
            description: "Delete an existing audience",
            func: () => {
                console.log("Delete Audience Clicked!");
                handleDeleteAudienceModalOpen();
            },
        },
        {
            label: "Update Director",
            description: "Update platform ID of a director",
            func: () => {
                console.log("Update Director Clicked!");
                handleOpenDirectorUpdateModal();
            },
        },
        {
            label: "List Directors",
            description: "View all directors",
            func: () => {
                console.log("List Directors Clicked!");
                handleListDirectorsModalOpen();
            },
        },
        {
            label: "Audience's Ratings",
            description: "View all ratings of a specific audience",
            func: () => {
                console.log("Audience's Ratings Clicked!");
                handleListRatingsModalOpen();
            },
        },
        {
            label: "Director's Movies",
            description: "View all movies of a specific director",
            func: () => {
                console.log("Director's Movies Clicked!");
                handleListDirectorsMoviesModalOpen();
            },
        },
        {
            label: "Movie's Rating",
            description: "View average rating of a specific movie",
            func: () => {
                console.log("Movie's Rating Clicked!");
                handleListMovieRatingModalOpen();
            },
        },
        {
            label: "Add Theater*",
            description: "Add a new theater",
            func: () => {
                console.log("Add Theater Clicked!");
                handleAddTheaterModalOpen();
            },
        },
    ];

    const handleCloseSnackbar = () => {

        setAlert({...alert, active: false });
    }

    return (
        <Grid container spacing={1}>
            <Snackbar open={alert.active} autoHideDuration={8000} onClose={handleCloseSnackbar}>
                <Alert severity={alert.alertType}>{alert.alertMessage}</Alert>
            </Snackbar>
            <AddUserModal addUserModal={addUserModal} setAddUserModal={setAddUserModal} setAlert={setAlert}></AddUserModal>
            <DeleteAudienceModal deleteAudienceModal={deleteAudienceModal} setDeleteAudienceModal={setDeleteAudienceModal} setAlert={setAlert}></DeleteAudienceModal>
            <DirectorUpdateModal directorUpdateModal={directorUpdateModal} setDirectorUpdateModal={setDirectorUpdateModal} setAlert={setAlert}></DirectorUpdateModal>
            <ListDirectorsModal listDirectorsModal={listDirectorsModal} setListDirectorsModal={setListDirectorsModal} setAlert={setAlert} ></ListDirectorsModal>
            <ListRatingsModal listRatingsModal={listRatingsModal} setListRatingsModal={setListRatingsModal} setAlert={setAlert}></ListRatingsModal>
            <ListDirectorsMoviesModal listDirectorsMoviesModal={listDirectorsMoviesModal} setListDirectorsMoviesModal={setListDirectorsMoviesModal} setAlert={setAlert}></ListDirectorsMoviesModal>
            <ListMovieRatingModal listMovieRatingModal={listMovieRatingModal} setListMovieRatingModal={setListMovieRatingModal} setAlert={setAlert}></ListMovieRatingModal>
            <AddTheaterModal addTheaterModal={addTheaterModal} setAddTheaterModal={setAddTheaterModal} setAlert={setAlert}></AddTheaterModal>
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

export default ManagerDashboard;