import React from "react";
import Section from "../Section/Section";
import Container from "@mui/material/Container";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ThankYou = () => {
    return (
        <Section>
            <Container maxWidth="xs"
                       sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           width: '100%'
                       }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 80, height: 80 }}>
                    <ThumbUpIcon sx={{fontSize: 50}} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Serdecznie dziękujemy!
                </Typography>
                <Typography variant="body2" sx={{mt: 2, textAlign: 'center'}}>
                    Na podany adres email została wysłana wiadomość z linkiem aktywacyjnym.
                </Typography>
            </Container>
        </Section>
    )
}

export default ThankYou;