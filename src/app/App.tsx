import React, {useCallback, useEffect} from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu} from '@mui/icons-material';
import {TodolistsList} from "../pages/TodolistsList/TodolistsList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../state/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../pages/Login/Login";
import {logoutTC} from "../pages/Login/auth-reducer";

type PropsType ={
    demo?: boolean
}
function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    }, [])

    if(!isInitialized){
        return <div style={{position:"fixed", top: "30%", left: "50%", width: "100%"}}>
            <CircularProgress />
        </div>
    }


    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistsList demo={demo}/>}/>
                        <Route path={"/login"} element={<Login />}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
