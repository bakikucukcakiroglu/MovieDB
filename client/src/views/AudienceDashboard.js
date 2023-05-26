import React, {useState} from 'react';
import {
    Grid, Card, CardContent,
    Typography,
    Alert, Snackbar,
} from '@mui/material';
import './Home.css';
import DeleteAudienceModal from "./modals/DeleteAudienceModal";
import ListSessionsModal from './modals/ListSessionsModal';
import ListMyTicketsModal from "./modals/ListMyTicketsModal";


const AudienceDashboard = () => {

    const [alert, setAlert] = useState({active:false, alertType: "error", alertMessage:""})

    const [listSessionsModal, setListSessionsModal] = useState(false);

    const handleListSessionsModalOpen = () => {
        setListSessionsModal(true);
    };

    const [deleteAudienceModal, setDeleteAudienceModal] = useState(false);

    const handleDeleteAudienceModalOpen = () => {
        setDeleteAudienceModal(true);
    };

    const [listMyTicketsModal , setListMyTicketsModal] = useState(false);

    const handleListMyTicketsModalOpen = () => {
        setListMyTicketsModal(true);
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
            label: "My Tickets",
            description: "List my tickets.",
            func: () => {
                console.log("List My Tickets Clicked!");
                handleListMyTicketsModalOpen();
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
            <ListMyTicketsModal listMyTicketsModal={listMyTicketsModal} setListMyTicketsModal={setListMyTicketsModal} setAlert={setAlert}> </ListMyTicketsModal>
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