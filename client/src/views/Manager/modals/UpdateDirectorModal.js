import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import {updateDirectorPlatform} from "../../../queries/manager.queries/updateDirector.query";

const DirectorUpdateModal = ({directorUpdateModal, setDirectorUpdateModal, setAlert}) => {

    const [username, setUsername] = useState('');
    const [platformId, setPlatformId] = useState('');

    const handleClose = () => {
        setDirectorUpdateModal(false);
        setUsername('');
        setPlatformId('');
    };

    const handleUpdate = async() => {
        // Perform the update action using the username and platformId values
        console.log('Director Username:', username);
        console.log('Platform ID:', platformId);

        const payload = {

            username:username,
            platform_id: platformId,
        }
        try {
            await updateDirectorPlatform(payload);
            // Handle successful update
            setAlert({active: true, alertType: "success", alertMessage: `Platform of ${username} is updated successfully!`});

        } catch (error) {
            console.error('Update director platform error:', error);

            setAlert({active: true, alertType: "error", alertMessage: error.message});

        }

        // Reset the form and close the modal
        setUsername('');
        setPlatformId('');
        setDirectorUpdateModal(false);
    };

    return (
        <div>
            <Dialog open={directorUpdateModal} onClose={handleClose}>
                <DialogTitle>Update Director</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Platform ID"
                        value={platformId}
                        onChange={(e) => setPlatformId(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained">Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DirectorUpdateModal;
