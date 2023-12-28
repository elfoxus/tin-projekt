import React from 'react';
import './Footer.css';
import {Box, Container, Typography, Link} from "@mui/material";
// import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <Box className="footer" sx={{
            backgroundColor: 'primary.main'
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