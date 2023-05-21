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

const Home = () => {

    const [alert, setAlert] = useState({active:false, alertType: "", alertMessage:""})

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
            },
        },
        {
            label: "Audience's Ratings",
            description: "View all ratings of a specific audience",
            func: () => {
                console.log("Audience's Ratings Clicked!");
            },
        },
        {
            label: "Director's Movies",
            description: "View all movies of a specific director",
            func: () => {
                console.log("Director's Movies Clicked!");
            },
        },
        {
            label: "Movie's Rating",
            description: "View average rating of a specific movie",
            func: () => {
                console.log("Movie's Rating Clicked!");
            },
        },
    ];

    const handleCloseSnackbar = () => {

        setAlert({active: false, alertType: "", alertMessage: ""});
    }

    return (
        <Grid container spacing={1}>
            <Snackbar open={alert.active} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert severity={alert.alertType}>{alert.alertMessage}</Alert>
            </Snackbar>
            <AddUserModal addUserModal={addUserModal} setAddUserModal={setAddUserModal} setAlert={setAlert}></AddUserModal>
            <DeleteAudienceModal deleteAudienceModal={deleteAudienceModal} setDeleteAudienceModal={setDeleteAudienceModal} setAlert={setAlert}></DeleteAudienceModal>
            <DirectorUpdateModal directorUpdateModal={directorUpdateModal} setDirectorUpdateModal={setDirectorUpdateModal} setAlert={setAlert}></DirectorUpdateModal>
            {actionsOfManager.map((action , index) =>
                <Grid key={index} item xs={6} sm={4} md={3}>
                    <Card className="dashboard-card" onClick={action.func}>
                        <CardContent className="home-card-content">
                            <Typography variant="h6" className="card-item">{action.label}</Typography>
                            <Typography style={{textAlign:"center"}} className="card-item">{action.description}</Typography>
                        </CardContent>
                    </Card>
                </Grid>)
            }
        </Grid>
    );
};

export default Home;