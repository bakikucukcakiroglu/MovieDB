import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    TextField,
} from "@mui/material";
import {addTheater} from "../../../queries/manager.queries/addTheater.query";

const AddTheaterModal = ({
                             addTheaterModal,
                             setAddTheaterModal,
                             setAlert,
                         }) => {
    const [theaterId, setTheaterId] = useState("");
    const [theaterName, setTheaterName] = useState("");
    const [theaterCapacity, setTheaterCapacity] = useState("");
    const [theaterDistrict, setTheaterDistrict] = useState("");

    const handleAddTheaterModalClose = () => {
        setAddTheaterModal(false);
        setTheaterId("");
        setTheaterName("");
        setTheaterCapacity("");
        setTheaterDistrict("");
    };

    const handleAddTheaterSubmit = async() => {
        // Handle form submission logic here
        console.log("Add Theater Form Submitted!");
        console.log("Theater ID:", theaterId);
        console.log("Theater Name:", theaterName);
        console.log("Theater Capacity:", theaterCapacity);
        console.log("Theater District:", theaterDistrict);

        const theater = {

            theater_id: theaterId.length ? theaterId : null,
            theater_name: theaterName.length ? theaterName : null, 
            theater_capacity: theaterCapacity.length ? theaterCapacity : null,
            theater_district: theaterDistrict.length ? theaterDistrict : null
        }

        try {
            const data =  await addTheater(theater);
            console.log("User data", data);
            setAlert({active: true, alertType: "success", alertMessage: `Theater ${theaterName} is saved successfully!`});

        } catch (error) {
            console.error("Create user error:", Error);
            setAlert({active: true, alertType: "error", alertMessage: error.message })
        }

        // Reset form fields
        setTheaterId("");
        setTheaterName("");
        setTheaterCapacity("");
        setTheaterDistrict("");

        // Close the modal
        handleAddTheaterModalClose();
    };

    const handleTheaterIdChange = (event) => {
        setTheaterId(event.target.value);
    };

    const handleTheaterNameChange = (event) => {
        setTheaterName(event.target.value);
    };

    const handleTheaterCapacityChange = (event) => {
        setTheaterCapacity(event.target.value);
    };

    const handleTheaterDistrictChange = (event) => {
        setTheaterDistrict(event.target.value);
    };

    return (
        <Dialog open={addTheaterModal} onClose={handleAddTheaterModalClose}>
            <DialogTitle>Add Theater</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        label="Theater ID"
                        value={theaterId}
                        onChange={handleTheaterIdChange}
                        fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Theater Name"
                            value={theaterName}
                            onChange={handleTheaterNameChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Theater Capacity"
                            value={theaterCapacity}
                            onChange={handleTheaterCapacityChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Theater District"
                            value={theaterDistrict}
                            onChange={handleTheaterDistrictChange}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddTheaterModalClose}>Cancel</Button>
                <Button onClick={handleAddTheaterSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTheaterModal;
