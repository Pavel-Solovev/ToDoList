import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useAppSelector} from "../app/store";
import {logoutTC} from "../features/Login/auth-reducer";
import {useDispatch} from "react-redux";

export function ButtonAppBar() {
    const isInitialised = useAppSelector<boolean>(state => state.app.isInitialised)
    const dispatch = useDispatch()
    const logoutChangeHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color='inherit'
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        href="/"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {!isInitialised ? <Button href="/login" color="inherit">Login</Button> :
                        <Button onClick={logoutChangeHandler} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}