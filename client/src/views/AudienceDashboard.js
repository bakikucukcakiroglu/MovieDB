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

const AudienceDashboard = () => {

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


    const actionsOfManager = [
        {
            label: "List Available Theatres",
            description: "List all of the theatres available for a given slot.",
            func: () => {
                console.log("Add User Clicked!");
                handleAddUserModalOpen();
            },
        },
        {
            label: "Add M",
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
       
    ];

    const handleCloseSnackbar = () => {

        setAlert({...alert, active: false });
    }

    return (
        <Grid container spacing={1}>
            <Snackbar open={alert.active} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert severity={alert.alertType}>{alert.alertMessage}</Alert>
            </Snackbar>
            <AddUserModal addUserModal={addUserModal} setAddUserModal={setAddUserModal} setAlert={setAlert}></AddUserModal>
            <DeleteAudienceModal deleteAudienceModal={deleteAudienceModal} setDeleteAudienceModal={setDeleteAudienceModal} setAlert={setAlert}></DeleteAudienceModal>
            <DirectorUpdateModal directorUpdateModal={directorUpdateModal} setDirectorUpdateModal={setDirectorUpdateModal} setAlert={setAlert}></DirectorUpdateModal>
            <ListDirectorsModal listDirectorsModal={listDirectorsModal} setListDirectorsModal={setListDirectorsModal} setAlert={setAlert} ></ListDirectorsModal>
            <ListRatingsModal listRatingsModal={listRatingsModal} setListRatingsModal={setListRatingsModal} setAlert={setAlert}></ListRatingsModal>
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