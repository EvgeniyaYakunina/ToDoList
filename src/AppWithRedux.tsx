import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
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
    const todoLists = useSelector<AppRootState, TodoListsType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId);
        dispatch(action);
        // dispatchToTasksReducer(action);
        // setTasks({...tasks,[todoListId]: tasks[todoListId].filter(t=> t.id !== id)})
    }

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title, todoListId));
        // let newTask = {id: v1(), title: title, isDone: false};
        // setTasks({...tasks,[todoListId]: [newTask,...tasks[todoListId]]})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
        // setTasks({...tasks,[todoListId]: tasks[todoListId].map(t=> t.id === taskId ? {...t,isDone: isDone} : t)})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
        // setTasks({...tasks,[todoListId]: tasks[todoListId].map(t=> t.id === taskId ? {...t,title: newTitle}:t)})
    }

    function changeFilter(filter: FilterValuesType,  todoListId: string) {
        dispatch(changeTodolistFilterAC(todoListId, filter));
        // setTodoLists([...todoLists.map(tl=> tl.id === todoListId ? {...tl,filter: filter} :tl)])
    }

    const removeTodoList=(todoListId: string)=>{
        const action = removeTodolistAC(todoListId);
        dispatch(action);
         // dispatchToTasksReducer(action);
        // setTodoLists(todoLists.filter(tl=> tl.id !== todoListId));
        // delete tasks[todoListId];
        // setTasks({...tasks})
    }

    const changeTodolistTitle=(todoListId: string,newTitle: string)=>{
        dispatch(changeTodolistTitleAC(todoListId, newTitle));
        // setTodoLists(todoLists.map(tl=> tl.id === todoListId ? {...tl,title: newTitle}:tl))
    }

    const addTodoList=(title: string)=>{
        const action = addTodolistAC(title);
        dispatch(action);
        // let todolist: TodoListsType = {id: v1(), filter: 'all', title: title}
        // setTodoLists([todolist, ...todoLists]);
        // setTasks({...tasks,[todolist.id]: []})
    }

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
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];

                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                        }
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                            <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
                                changeTodolistTitle={changeTodolistTitle}
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
