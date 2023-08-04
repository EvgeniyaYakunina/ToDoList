import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType={
    [key: string]: TaskType[]
}


function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, TodoListsType[]>(state => state.todolists)
    // const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    // const removeTask = useCallback((id: string, todoListId: string) => {
    //     dispatch(removeTaskAC(id, todoListId));
    // }, [dispatch])

    // const addTask = useCallback((title: string, todoListId: string) => {
    //     dispatch(addTaskAC(title, todoListId));
    // }, [dispatch])

    // const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
    //     dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    // }, [dispatch])

    // const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
    //     dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
    // }, [dispatch])

    // const changeFilter = useCallback((filter: FilterValuesType,  todoListId: string) => {
    //     dispatch(changeTodolistFilterAC(todoListId, filter));
    // }, [dispatch])

    // const removeTodoList= useCallback((todoListId: string) => {
    //     const action = removeTodolistAC(todoListId);
    //     dispatch(action);
    // }, [dispatch])

    // const changeTodolistTitle= useCallback((todoListId: string,newTitle: string)=>{
    //     dispatch(changeTodolistTitleAC(todoListId, newTitle));
    // }, [dispatch])

    const addTodoList= useCallback((title: string) =>{
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return (
                            <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                            <Todolist
                                id={tl.id}
                                 // todolist={tl}

                                // title={tl.title}
                                // tasks={tasks}
                                // removeTask={removeTask}
                                // changeFilter={changeFilter}
                                // addTask={addTask}
                                // changeTaskStatus={changeStatus}
                                // filter={tl.filter}
                                // removeTodolist={removeTodoList}
                                // changeTaskTitle={changeTaskTitle}
                                // changeTodolistTitle={changeTodolistTitle}
                            />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
