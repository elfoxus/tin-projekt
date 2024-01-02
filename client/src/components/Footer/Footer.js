import React from 'react';
import {Box, Container, Typography, Link, Paper, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import Switch from "@mui/material/Switch";

const Footer = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    const changeLang = (ev) => {
        if (ev.target.checked) {
            i18n.changeLanguage('en')
        } else {
            i18n.changeLanguage('pl')
        }
    }

    return (
        <Paper sx={{
            backgroundColor: theme.palette.mode === 'light' ? 'primary.main' : theme.palette.background.default,
            zIndex: 5,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
        }}>
            <Container maxWidth="lg" sx={{
                py: 2,
            }}>
                <Typography variant={"body2"} color={"primary.light"} align={"center"}>
                    {t('footer.copyright') + ' '}
                    <Link href="/" color={"primary.light"}>
                        {t('footer.logo')}
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
                <Box sx={{position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center'}}>
                    <Typography variant={"caption"} color={"white"}>PL</Typography>
                    <Switch color="default" onChange={changeLang} />
                    <Typography variant={"caption"} color={"white"}>EN</Typography>
                </Box>
            </Container>
        </Paper>
    )
}

export default Footer;