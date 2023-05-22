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
import ListSessionsModal from './modals/ListSessionsModal';


const AudienceDashboard = () => {

    const [alert, setAlert] = useState({active:false, alertType: "error", alertMessage:""})

    const [directorUpdateModal, setDirectorUpdateModal] = useState(false);
    const handleOpenDirectorUpdateModal = () => {
        setDirectorUpdateModal(true);
    };

    const [listSessionsModal, setListSessionsModal] = useState(false);

    const handleListSessionsModalOpen = () => {
        setListSessionsModal(true);
    };

    const [deleteAudienceModal, setDeleteAudienceModal] = useState(false);

    const handleDeleteAudienceModalOpen = () => {
        setDeleteAudienceModal(true);
    };



    const actionsOfManager = [
        {
            label: "List Movie Sessions",
            description: "List all movie sessions.",
            func: () => {
                console.log("List all sessions Clicked!");
                handleListSessionsModalOpen();
            },
        },
        {
            label: "Buy Ticket",
            description: "Buy a movie ticket for a specific session.",
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
       
    ];

    const handleCloseSnackbar = () => {

        setAlert({...alert, active: false });
    }

    return (
        <Grid container spacing={1}>
            <Snackbar open={alert.active} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert severity={alert.alertType}>{alert.alertMessage}</Alert>
            </Snackbar>
            <ListSessionsModal listSessionsModal={listSessionsModal} setListSessionsModal={setListSessionsModal} setAlert={setAlert}></ListSessionsModal>
            <DeleteAudienceModal deleteAudienceModal={deleteAudienceModal} setDeleteAudienceModal={setDeleteAudienceModal} setAlert={setAlert}></DeleteAudienceModal>
            <DirectorUpdateModal directorUpdateModal={directorUpdateModal} setDirectorUpdateModal={setDirectorUpdateModal} setAlert={setAlert}></DirectorUpdateModal>
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

export default  AudienceDashboard;