import React, {ChangeEvent, memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = memo(({task, todolistId}: TaskPropsType) => {
    // console.log('Task')
    const {id, title, isDone} = task
    const dispatch = useDispatch();

    const onClickHandler = ()=> dispatch(removeTaskAC(task.id, todolistId))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue =  e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }
    const onChangeTitleHandler = useCallback((newValue: string) => dispatch(changeTaskTitleAC(task.id, newValue, todolistId)), [dispatch])

    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}><Delete/></IconButton>
    </div>
})