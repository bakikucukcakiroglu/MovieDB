import React, { useContext, useState } from 'react';
import {AppBar, Toolbar, Typography, Button, Container, MenuItem, Menu} from '@mui/material';
import { AuthContext } from '../helpers/AuthProvider';

const Layout = ({ children }) => {
    const { isLoggedIn, Logout } = useContext(AuthContext);


    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        // Perform logout logic here
        Logout();
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MovieDb
                    </Typography>
                    {isLoggedIn && (
                        <div>
                            <Button
                                color="inherit"
                                aria-controls="user-menu"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                            >
                                {isLoggedIn.type}: {isLoggedIn?.username}
                            </Button>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                {children}
            </Container>
            <footer>
                <Typography variant="body2" color="text.secondary" align="center">
                    Made with ♥ at Bogazici University
                </Typography>
            </footer>
        </div>
    );
};

export default Layout;
