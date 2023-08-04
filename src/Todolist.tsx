import React, {memo, useCallback, useMemo} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {TodoListsType} from "./AppWithRedux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    //todolist: TodoListType

    // title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType, todolistId: string) => void
    // addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // removeTodolist: (id: string) => void
    // changeTodolistTitle: (id: string, newTitle: string) => void
    // filter: FilterValuesType
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    const todolist = useSelector<AppRootState,TodoListsType>(state => state.todolists.find(todo=> todo.id === props.id) as TodoListsType)
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootState, TaskType[]>(state=> state.tasks[id])
    const dispatch = useDispatch();

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id,'all')), [dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id,'active')), [dispatch])
    const onCompletedClickHandler = useCallback(() =>  dispatch(changeTodolistFilterAC(id,'completed')), [dispatch])

    const onClickRemoveTodoList = useCallback(()=> dispatch(removeTodolistAC(id)), [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string)=> dispatch(changeTodolistTitleAC(id, newTitle)), [dispatch])

    const addTask = useCallback((title: string) => dispatch(addTaskAC(title,id)), [dispatch])

    useMemo(()=> {
        console.log('useMemo')
        if (filter === "active") {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasks = tasks.filter(t => t.isDone);
        }
        return tasks
    }, [])

    // if (filter === "active") {
    //     tasks = tasks.filter(t => !t.isDone);
    // }
    // if (filter === "completed") {
    //     tasks = tasks.filter(t => t.isDone);
    // }

    return <div>
        <h3><EditableSpan title={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={onClickRemoveTodoList}><Delete/></IconButton></h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasks.map(t =>
                <Task key={t.id} task={t}
                      todolistId={props.id}
                />
                    // {const onClickHandler = () => dispatch(removeTaskAC(t.id,id))
                    // const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, id))
                    // }
                    // const onChangeTitleHandler = (newValue: string) =>  dispatch(changeTaskTitleAC(t.id, newValue, id))
                    //
                    // return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                    //     <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                    //     <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    //     <IconButton onClick={onClickHandler}><Delete/></IconButton>
                    // </div>}
                )}
        </div>
        <div>
            <ButtonWithMemo title={'All'} color={'inherit'} variant={filter === 'all' ? "contained" : "text"} onClick={onAllClickHandler}/>
           <ButtonWithMemo title={'Active'} color={'primary'} variant={filter === 'active' ? "contained" : "text"} onClick={onActiveClickHandler}/>
           <ButtonWithMemo title={'Completed'} color={'secondary'} variant={filter === 'completed' ? "contained" : "text"} onClick={onCompletedClickHandler}/>
            {/*<Button variant = {filter === 'all' ? "contained" : "text"}*/}
            {/*        onClick={onAllClickHandler}>All</Button>*/}
            {/*<Button color={'primary'} variant ={filter === 'active' ? "contained" : "text"}*/}
            {/*        onClick={onActiveClickHandler}>Active</Button>*/}
            {/*<Button color={'secondary'} variant={filter === 'completed' ? "contained" : "text"}*/}
            {/*        onClick={onCompletedClickHandler}>Completed</Button>*/}
        </div>
    </div>
})

export type ButtonWithMemoPropsType={
    title: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant:   'text' | 'outlined' | 'contained'
    onClick: ()=> void
}

export const ButtonWithMemo = memo((props:ButtonWithMemoPropsType )=>{
    return <Button variant={props.variant}
                   onClick={props.onClick}
                   color={props.color}>
        {props.title}
    </Button>
})

