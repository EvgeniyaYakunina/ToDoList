import React, {useState} from 'react';
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

export type FilterValuesType = "all" | "active" | "completed";

type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType={
    [key: string]: TaskType[]
}


function App() {

    function removeTask(id: string, todoListId: string) {
        let task = tasks[todoListId];
        let filteredTasks = task.filter(t => t.id !== id);
        tasks[todoListId] = filteredTasks;
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let task = tasks[todoListId];
        let newTasks = [newTask, ...task];
        tasks[todoListId] = newTasks
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let task = tasks[todoListId];
        let taskStatus = task.find(t => t.id === taskId);
        if (taskStatus) {
            taskStatus.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let task = tasks[todoListId];
        let taskStatus = task.find(t => t.id === taskId);
        if (taskStatus) {
            taskStatus.title = newTitle;
            setTasks({...tasks});
        }
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    const removeTodoList=(todoListId: string)=>{
        let filteredTodolist = todoLists.filter(tl=> tl.id !== todoListId)
        setTodoLists(filteredTodolist);

        delete tasks[todoListId];
        setTasks({...tasks})
    }

    const changeTodolistTitle=(todoListId: string,newTitle: string)=>{
        const todolist = todoLists.find(tl=> tl.id === todoListId );
        if(todolist){
            todolist.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId1, title: "What to watch", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: "completed"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "Friends", isDone: true},
            {id: v1(), title: "Ted Lasso", isDone: true},
            {id: v1(), title: "Mandalorian", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Pizza", isDone: true},
            {id: v1(), title: "Cola", isDone: false}
        ]
    })

    const addTodoList=(title: string)=>{
        let todolist: TodoListsType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todolist, ...todoLists]);
        setTasks({...tasks,[todolist.id]: []})
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

export default App;
