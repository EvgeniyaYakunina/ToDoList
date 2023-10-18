import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {Task, TaskPropsType} from "../pages/TodolistsList/Todolist/Task/Task";
import {ReduxStoreProviderDecoration} from "../state/ReduxStoreProviderDecoration";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/api";


const meta: Meta<typeof Task> = {
  title: 'TODOLIST/Task',
  component: Task,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecoration]

}

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWithRedux = (props: TaskPropsType) => {

  let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

  if (!task) task = {id:"3", title: 'defaultTask', status: TaskStatuses.New, addedDate: "", deadline: "", order: 1,
    startDate: "", description: "", priority: TaskPriorities.Low, todoListId: ""}


  return <Task task={task} todolistId={'todolistId1'}
               removeTask={props.removeTask}
               changeTaskTitle={props.changeTaskTitle}
               changeTaskStatus={props.changeTaskStatus}/>
}

// export const TaskStory: Story = {
//   render: () => <TaskWithRedux />
// }


