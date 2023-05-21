import React, {useContext, useEffect, useState} from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import {useLogin} from "../queries/login.query";
import {AuthContext} from "../helpers/AuthProvider";
import {useNavigate} from "react-router-dom";

export default function Login (effect, deps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus]= useState("");
    const login = useLogin();
    const { isLoggedIn, Login } = useContext(AuthContext);


    const navigate =useNavigate();

    useEffect(()=> {

        if(isLoggedIn){

            console.log("Logged in: Redirecting to home.")
            navigate('/home');
        }
    }, [isLoggedIn])
    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            username: email,
            password: password,
        };

        try {
            const data = await login.mutateAsync(credentials);

            console.log("data", data);
            Login(data);

        } catch (error) {
            console.error("Login error:", error);
            setLoginStatus("Invalid credentials.")

            setTimeout( () => {

                setLoginStatus("");
            }, 3000)
        }
    };


    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '1rem' }}
                >
                    Login
                </Button>
            </form>
            <div>{loginStatus}</div>

        </Container>
    );
};