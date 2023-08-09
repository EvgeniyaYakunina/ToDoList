import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import {Task} from "../Task";
import {TaskType} from "../Todolist";
import {ReduxStoreProviderDecoration} from "../state/ReduxStoreProviderDecoration";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/store";


const meta: Meta<typeof Task> = {
  title: 'TODOLIST/Task',
  component: Task,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecoration]

}

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWithRedux = () => {

  let task = useSelector<AppRootState, TaskType>(state => state.tasks['todolistId1'][0])

  if (!task) task = {id: 'qesw54', title: 'defaultTask', isDone: false}


  return <Task task={task} todolistId={'todolistId1'} />
}

export const TaskStory: Story = {
  render: () => <TaskWithRedux />
}


