import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {Chip, TextField} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {v4} from "uuid";

const ChipEditListSortableItem = ({id, text, onDelete, onTextChange, index}) => {

    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const handleClick = () => {
        setEditing(true);
    }

    const textChanged = (event) => {
        setInputValue(event.target.value);
    }

    const onBlur = () => {
        setEditing(false);
        onTextChange(id, inputValue)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onBlur();
        }
    }

    return (
        <Chip
            sx={{
                ...style,
                gap: editing ? 0 : 1,
                '& > .MuiChip-avatar': {
                    width: 'auto',
                    marginLeft: editing ? '10px' : '5px',
                },
                '& > .MuiChip-avatar > .MuiInput-root::before': {
                    bottom: '4px'
                },
                '& > .MuiChip-avatar > .MuiInput-root::after': {
                    bottom: '4px'
                }
            }}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            avatar={editing
                ? <TextField
                    onBlur={onBlur}
                    onChange={textChanged}
                    onKeyDown={handleKeyDown}
                    variant="standard"
                    size="small"
                    defaultValue={text}
                />
                : null}
            label={editing
                ? ''
                : ((typeof index == 'number')
                        ? (index + 1) + '. '
                        : '') + text}
            onDelete={() => onDelete(id)}
            onClick={handleClick}
            deleteIcon={<DeleteIcon />}/>
    )
}

export default ChipEditListSortableItem;