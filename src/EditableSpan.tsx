import React, {ChangeEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange:(newValue: string)=>void
}
export const EditableSpan = memo((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");

    const activateEditMode =()=> {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode =()=> {
        setEditMode(false);
        props.onChange(title);
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>)=> setTitle(e.currentTarget.value)
    return (
        editMode
        ? <TextField value={title}
                 onChange={onChangeTitleHandler}
                 onBlur={activateViewMode}
                 autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )

})