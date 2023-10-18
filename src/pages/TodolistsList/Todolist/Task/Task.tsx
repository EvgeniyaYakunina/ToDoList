import React, {ChangeEvent,useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/api";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})



// type TaskPropsType = {
//     task: TaskType
//     todolistId: string
// }
// export const Task = memo(({task, todolistId}: TaskPropsType) => {
//     // console.log('Task')
//     const {id, title, isDone} = task
//     const dispatch = useDispatch();
//
//     const onClickHandler = ()=> dispatch(removeTaskAC(task.id, todolistId))
//     const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         let newIsDoneValue =  e.currentTarget.checked
//         dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
//     }
//     const onChangeTitleHandler = useCallback((newValue: string) => dispatch(changeTaskTitleAC(task.id, newValue, todolistId)), [dispatch])
//
//     return <div key={task.id} className={task.isDone ? "is-done" : ""}>
//         <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
//         <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
//         <IconButton onClick={onClickHandler}><Delete/></IconButton>
//     </div>
// })