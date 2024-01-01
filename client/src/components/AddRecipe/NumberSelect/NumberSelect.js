import React from "react";
import {TextField} from "@mui/material";

const NumberSelect = ({idProp, onChange, disabledProp, label, placeholder, min, max, value}) => {

    const onTextChange = (event) => {
        let newValue = event.target.value;
        if (newValue < min) newValue = min;
        if (newValue > max) newValue = max;
        onChange(newValue);
    }

    return (
        <TextField
            id={idProp}
            label={label}
            placeholder={placeholder}
            type="number"
            disabled={disabledProp}
            value={value}
            onChange={onTextChange}
        />
    )
}

export default NumberSelect;