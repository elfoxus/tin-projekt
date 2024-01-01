import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import MenuLink from "./MenuLink/MenuLink";
import api from "../../services/api";
import UserMenuSection from "./UserMenuSection/UserMenuSection";

const Header = () => {


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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
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
                    <UserMenuSection>
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
                    </UserMenuSection>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;