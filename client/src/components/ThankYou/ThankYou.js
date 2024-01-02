import React from "react";
import Section from "../Section/Section";
import Container from "@mui/material/Container";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const ThankYou = () => {

    const { t } = useTranslation();

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
                    {t('thank-you.title')}
                </Typography>
                <Typography variant="body2" sx={{mt: 2, textAlign: 'center'}}>
                    {t('thank-you.info')}
                </Typography>
            </Container>
        </Section>
    )
}

export default ThankYou;