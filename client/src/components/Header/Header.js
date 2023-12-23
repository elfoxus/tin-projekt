import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import {AppBar, Box, Button, Container, Toolbar} from "@mui/material";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import axios from "axios";
import MenuLink from "./MenuLink/MenuLink";

const Header = () => {

    const pages = [
        {
            text: 'Home',
            url: '/',
            id: 'home'
        },
        {
            text: 'Categories',
            url: '/categories',
            id: 'categories',
        },
        {
            text: 'Dishes',
            url: '/dishes',
            id: 'dishes'
        },
        {
            text: 'About us',
            url: '/about-us',
            id: 'about-us'
        }
    ]

    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
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
        axios.get('/api/dishes')
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
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;