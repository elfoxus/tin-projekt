import React from 'react';
import {Box, Container, Typography, Link} from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            zIndex: 5,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0
        }}>
            <Container maxWidth="lg" sx={{
                py: 2
            }}>
                <Typography variant={"body2"} color={"primary.light"} align={"center"}>
                    {'Copyright © '}
                    <Link href="/" color={"primary.light"}>
                        Recipes Online
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer;