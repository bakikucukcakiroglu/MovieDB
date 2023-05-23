import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import {addUser} from "../../queries/addUser.query";
const AddUserModal = ({addUserModal, setAddUserModal, setAlert}) => {

    const [userType, setUserType] = useState("audience");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nationality, setNationality] = useState("");
    const [platformId, setPlatformId] = useState("");

    const handleAddUserModalClose = () => {

        setAddUserModal(false);
        setName("");
        setUsername("");
        setNationality("");
        setSurname("");
        setPassword("");
        setPlatformId("");
    };

    const handleAddUserSubmit  = async (e) => {
        // Handle form submission logic here
        console.log("Add User Form Submitted!");
        console.log("User Type:", userType);
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Name:", name);
        console.log("Surname:", surname);
        console.log("Nationality:", nationality);
        console.log("Platform ID:", platformId);

        const user = {

            user_type : userType,
            username: username.length ? username : null,
            password_: password.length ? password : null,
            name_: name.length ? name : null,
            surname: surname.length ? surname : null,
            nationality: nationality.length ? nationality : null,
            platform_id: platformId.length ? platformId : null

        }

        try {
            const data =  await addUser(user);
            console.log("User data", data);
            setAlert({active: true, alertType: "success", alertMessage: `${userType} ${username} is saved successfully!`});

        } catch (error) {
            console.error("Create user error:", Error);
            setAlert({active: true, alertType: "error", alertMessage: error.message })
        }

        // Reset form fields
        setUserType("audience");
        setUsername("");
        setPassword("");
        setName("");
        setSurname("");
        setNationality("");
        setPlatformId("");

        // Close the modal
        handleAddUserModalClose();
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSurnameChange = (event) => {
        setSurname(event.target.value);
    };

    const handleNationalityChange = (event) => {
        setNationality(event.target.value);
    };

    const handlePlatformIdChange = (event) => {
        setPlatformId(event.target.value);
    };

    return(

    <Dialog open={addUserModal} onClose={handleAddUserModalClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <RadioGroup value={userType} onChange={handleUserTypeChange}>
                        <FormControlLabel value="audience" control={<Radio/>} label="Audience"/>
                        <FormControlLabel value="director" control={<Radio/>} label="Director"/>
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Surname"
                        value={surname}
                        onChange={handleSurnameChange}
                        fullWidth
                    />
                </Grid>
                {userType === "director" && (
                    <Grid item xs={12}>
                        <TextField
                            label="Nationality"
                            value={nationality}
                            onChange={handleNationalityChange}
                            fullWidth
                        />
                    </Grid>
                )}
                {userType === "director" && (
                    <Grid item xs={12}>
                        <TextField
                            label="Platform ID"
                            value={platformId}
                            onChange={handlePlatformIdChange}
                            fullWidth
                        />
                    </Grid>
                )}
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleAddUserModalClose}>Cancel</Button>
            <Button onClick={handleAddUserSubmit} color="primary">Submit</Button>
        </DialogActions>
    </Dialog>

    )
}

export default  AddUserModal;