import React, {useState, useEffect, Fragment} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import MenuLink from "./MenuLink/MenuLink";
import useAuth from "../../services/auth";
import {AccountCircle} from "@mui/icons-material";
import api from "../../services/api";

const Header = () => {

    const { username, role } = useAuth();

    const pages = [
        {
            text: 'Wszystkie',
            url: '/',
            id: 'home'
        },
        {
            text: 'Kategorie',
            url: '/categories',
            id: 'categories',
        },
        {
            text: 'Dania',
            url: '/dishes',
            id: 'dishes'
        },
        {
            text: 'O nas',
            url: '/about-us',
            id: 'about-us'
        },
        {
            text: 'Logowanie',
            url: '/login',
            id: 'login'
        },
        {
            text: 'Rejestracja',
            url: '/register',
            id: 'register'
        }
    ]

    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        api.get('/categories')
            .then(res => {
                var cats = res.data.map(category => {
                    return {
                        text: category,
                        url: `/category/${category}`
                    }
                });
                setCategories(cats);
            })
    }, [])

    useEffect(() => {
        api.get('/dishes')
            .then(res => {
                var dishs = res.data.map(dish => {
                    return {
                        text: dish,
                        url: `/dish/${dish}`
                    }
                });
                setDishes(dishs);
            })
    }, [])

    return (
        <AppBar position="fixed" className="header">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <HeaderLogo />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                        <Link to={pages[0].url} id={pages[0].id}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                {pages[0].text}
                            </Button>
                        </Link>
                        <MenuLink text={pages[1].text} id={pages[1].id} url={pages[1].url} links={categories} />
                        <MenuLink text={pages[2].text} id={pages[2].id} url={pages[2].url} links={dishes} />
                        <Link to={pages[3].url} id={pages[3].id}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                {pages[3].text}
                            </Button>
                        </Link>
                    </Box>
                    {username ? (
                        <IconButton sx={{marginLeft: 'auto'}}>
                            <AccountCircle sx={{ color: 'white' }} />
                        </IconButton>
                    ) : (
                        <Fragment>
                            <Link to={pages[4].url} id={pages[4].id}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {pages[4].text}
                                </Button>
                            </Link>
                            <Link to={pages[5].url} id={pages[5].id}>
                                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {pages[5].text}
                                </Button>
                            </Link>
                        </Fragment>
                    )}

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;