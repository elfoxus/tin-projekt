import React, {useState, Fragment} from 'react';
import {Box, TextField} from "@mui/material";
import {v4} from "uuid";
import {DndContext, closestCenter, useSensors, PointerSensor, useSensor} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import ChipEditListSortableItem from "./ChipEditListSortableItem";

const ChipEditList = ({title, placeholder, values, setValues, indexes}) => {
    const [inputValue, setInputValue] = useState('');
    const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {distance: 5}}));

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setValues([...values, {
                id: v4(),
                text: inputValue
            }]);
            setInputValue('');
        }
    }

    const handleDragEnd = (event) => {
        const {active, over} = event;

        if (!over || !active) {
            return;
        }

        if (active.id !== over.id) {
            setValues((values) => {
                const oldIndex = values.findIndex(value => value.id === active.id);
                const newIndex = values.findIndex(value => value.id === over.id);

                return arrayMove(values, oldIndex, newIndex);
            })
        }
    }

    const handleDelete = (id) => {
        setValues(values.filter(value => value.id !== id));
    }

    const onElementTextChanged = (id, text) => {
        setValues(values.map(value => {
            if (value.id === id) {
                return {
                    id: id,
                    text: text
                }
            }
            return value;
        }))
    }


    return (
        <Fragment>
            <TextField
                label={title}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <Box sx={{
                    marginTop: values.length == 0 ? '-16px' : '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                    gap: 2,
                }}>
                    <SortableContext
                        items={values}
                        strategy={verticalListSortingStrategy}
                    >
                        {values.map((value, index) =>
                            <ChipEditListSortableItem
                                key={value.id}
                                id={value.id}
                                text={value.text}
                                onTextChange={onElementTextChanged}
                                onDelete={handleDelete}
                                index={indexes ? index : null}
                            />)
                        }

                    </SortableContext>
                </Box>
            </DndContext>
        </Fragment>
    )
}

export default ChipEditList;