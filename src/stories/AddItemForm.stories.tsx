import type { Meta, StoryObj } from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "../components/AddItemForm";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox, ControlPoint} from "@mui/icons-material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    addItem: {
      description:'Clicked button inside form',
      action: 'Clicked button inside form'
    }
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;


export const AddItemFormStory: Story = {
  // args: {
  //   addItem: action('Clicked button inside form')
  // }
//  Можно использовать как вариант
}

const AddItemFormWithError = (args: AddItemFormPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>('Title is required')

  const addItem = () => {
    if (title.trim() !== "") {
      args.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addItem();
    }
  }
  return <div>
    <TextField variant="outlined"
               error={!!error}
               value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               label="Title"
               helperText={error}
    />
    <IconButton color="primary" onClick={addItem}>
      <AddBox />
    </IconButton>
  </div>
}

export const AddItemFormWithErrorStory: Story = {
  render: args => <AddItemFormWithError addItem={args.addItem}/>
}
export const AddItemFormDisabledExample =(props: any)=>{
  return (<AddItemForm disabled={true}
      addItem={action('Button inside clicked')}/>)
}