import React from "react";
import "./Section.css";
import {Box, Container, Typography} from "@mui/material";

const Section = ({title = null, children}) => {
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: { md: 'center', lg: 'baseline'}, height: '100%'}} disableGutters={true}>
            {title && <Typography component="h1" variant="h5" paddingLeft={1} sx={{textAlign: 'center'}}>{title}</Typography>}
            {children}
        </Container>
    )
}

export default Section;