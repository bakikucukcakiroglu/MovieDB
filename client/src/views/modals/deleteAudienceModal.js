import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React, {useState} from "react";
import {deleteUser} from "../../queries/deleteUser.query";


const DeleteAudienceModal = ({deleteAudienceModal, setDeleteAudienceModal,  setAlert}) => {

    const [deleteAudienceUsername, setDeleteAudienceUsername] = useState('');


    const handleDeleteAudienceConfirm = async () => {


        try {
            await deleteUser(deleteAudienceUsername);

            setAlert({active: true, alertType: "success", alertMessage: `${deleteAudienceUsername} is deleted successfully!`});

        } catch (error) {
            console.error("Delete user error:", error);
            setAlert({active: true, alertType: "error", alertMessage: `${deleteAudienceUsername} couldn't be deleted!`})

        }

        // Perform the delete audience action using the deleteAudienceUsername value
        console.log("Delete Audience Username:", deleteAudienceUsername);

        // Reset the modal state
        setDeleteAudienceUsername('');
        setDeleteAudienceModal(false);
    };

    const handleDeleteAudienceCancel = () => {
        // Reset the modal state
        setDeleteAudienceUsername('');
        setDeleteAudienceModal(false);
    };



    return (
        <Dialog open={deleteAudienceModal} onClose={handleDeleteAudienceCancel}>
            <DialogTitle>Delete Audience</DialogTitle>
            <DialogContent>
                <TextField
                    label="Username"
                    value={deleteAudienceUsername}
                    onChange={(e) => setDeleteAudienceUsername(e.target.value)}
                    fullWidth
                    style={{minWidth:"400px"}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteAudienceCancel}>Cancel</Button>
                <Button onClick={handleDeleteAudienceConfirm} variant="contained" color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>

    )

}

export default DeleteAudienceModal;