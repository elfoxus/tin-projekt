import React from "react";
import "./Section.css";
import {Box, Typography} from "@mui/material";

const Section = ({title = null, children, wrapperClasses = ""}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
            <Box className={"section-wrapper".concat(" ").concat(wrapperClasses)}>
                {title && <Typography variant="h3" className="section-title">{title}</Typography>}
                <div>{children}</div>
            </Box>
        </Box>
    )
}

export default Section;