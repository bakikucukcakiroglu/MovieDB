import React, {useState} from 'react';
import {
    Grid, Card, CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField, FormControlLabel, RadioGroup, Radio, Alert, Snackbar,
} from '@mui/material';
import './Home.css';
import {useAddUser} from "../queries/addUser.query";


const actionsOfManager = [
    {
        label: "Add User",
        description: "Add a new audience or director",
        func: () => {
            console.log("Add User Clicked!");
        },
    },
    {
        label: "Delete Audience",
        description: "Delete an existing audience",
        func: () => {
            console.log("Delete Audience Clicked!");
        },
    },
    {
        label: "Update Director",
        description: "Update platform ID of a director",
        func: () => {
            console.log("Update Director Clicked!");
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


const Home = () => {

    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [userType, setUserType] = useState("audience");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nationality, setNationality] = useState("");
    const [platformId, setPlatformId] = useState("");
    const [alert, setAlert] = useState({active:false, alertType: "", alertMessage:""})
    const addUser = useAddUser();


    const [deleteAudienceOpen, setDeleteAudienceOpen] = useState(false);
    const [deleteAudienceUsername, setDeleteAudienceUsername] = useState('');

    const handleDeleteAudienceOpen = () => {
        setDeleteAudienceOpen(true);
    };

    const handleDeleteAudienceConfirm = () => {
        // Perform the delete audience action using the deleteAudienceUsername value
        console.log("Delete Audience Username:", deleteAudienceUsername);

        // Reset the modal state
        setDeleteAudienceUsername('');
        setDeleteAudienceOpen(false);
    };

    const handleDeleteAudienceCancel = () => {
        // Reset the modal state
        setDeleteAudienceUsername('');
        setDeleteAudienceOpen(false);
    };

    const handleAddUserModalOpen = () => {
        setAddUserModalOpen(true);
    };

    const handleAddUserModalClose = () => {

        setAddUserModalOpen(false);
        setName("");
        setUsername("");
        setNationality("");
        setSurname("");
        setPassword("");
        setPlatformId("");
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
            const data = await addUser.mutateAsync(user);
            console.log("User data", data);
            setAlert({active: true, alertType: "success", alertMessage: `${userType} ${username} is saved successfully!`});

/*
            setTimeout(()=>{ setAlert({active: false, ...alert})}, 3000);
*/

        } catch (error) {
            console.error("Create user error:", error);
            setAlert({active: true, alertType: "error", alertMessage: `${userType} ${username} couldn't be saved!`})
/*
            setTimeout(()=>{ setAlert({active: false, ...alert})}, 3000);
*/


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
                handleDeleteAudienceOpen();
            },
        },
        {
            label: "Update Director",
            description: "Update platform ID of a director",
            func: () => {
                console.log("Update Director Clicked!");
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

            <Dialog open={isAddUserModalOpen} onClose={handleAddUserModalClose}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <RadioGroup value={userType} onChange={handleUserTypeChange}>
                                <FormControlLabel value="audience" control={<Radio />} label="Audience" />
                                <FormControlLabel value="director" control={<Radio />} label="Director" />
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

            <Dialog open={deleteAudienceOpen} onClose={handleDeleteAudienceCancel}>
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


            {actionsOfManager.map((action , index) =>

                <Grid key={index} item xs={6} sm={4} md={3}>
                    <Card className="dashboard-card" onClick={action.func}>
                        <CardContent className="home-card-content">
                            <Typography variant="h6" className="card-item">{action.label}</Typography>
                            <Typography style={{textAlign:"center"}} className="card-item">{action.description}</Typography>

                            {/* Add your functionality for managing audiences */}
                        </CardContent>
                    </Card>
                </Grid>)
            }

            {/* Add more cards for other functionalities */}
        </Grid>
    );
};

export default Home;








