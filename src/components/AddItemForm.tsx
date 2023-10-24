import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = memo(({addItem, disabled = false}: AddItemFormPropsType)=>{
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error) setError(null);
        if (e.charCode === 13) {
            addItemHandler();
        }

    }

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return(
        <div>
            <TextField value={title}
                       disabled={disabled}
                       variant={'outlined'}
                       label={'Type value'}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addItemHandler} disabled={disabled} color={'primary'}><ControlPoint/></IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )

})