import React from "react";
import "./Section.css";
import {Box, Container, Typography} from "@mui/material";

const Section = ({title = null, children}) => {
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'baseline', marginTop: 2, height: '100%'}} >
            {title && <Typography component="h1" variant="h5" paddingLeft={1}>{title}</Typography>}
            {children}
        </Container>
    )
}

export default Section;