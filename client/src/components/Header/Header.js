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
import {useTranslation} from "react-i18next";
import {styled, useColorScheme} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {ColorModeContext} from "../../App";
import {useTheme} from "@mui/material";

const Header = () => {

    const { t } = useTranslation();
    const colorMode = React.useContext(ColorModeContext);
    const theme = useTheme();

    const pages = [
        {
            text: 'header.main-page',
            url: '/',
            id: 'home'
        },
        {
            text: 'header.categories',
            url: '/categories',
            id: 'categories',
        },
        {
            text: 'header.dishes',
            url: '/dishes',
            id: 'dishes'
        },
        {
            text: 'header.about-us',
            url: '/about-us',
            id: 'about-us'
        },
        {
            text: 'header.login',
            url: '/login',
            id: 'login'
        },
        {
            text: 'header.register',
            url: '/register',
            id: 'register'
        },
        {
            text: 'header.tags',
            url: '/tags',
            id: 'tags'
        }
    ]

    const [categories, setCategories] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [tags, setTags] = useState([]);

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

    useEffect(() => {
        api.get('/tags')
            .then(res => {
                var tags = res.data.map(tag => {
                    return {
                        text: tag,
                        url: `/tag/${tag}`
                    }
                });
                setTags(tags);
            })
    }, [])

    return (
        <AppBar position="fixed" className="header">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <HeaderLogo />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                        <Link to={pages[0].url} id={pages[0].id}>
                            <Button  sx={{ my: 2, color: 'white', display: 'block' }}>
                                {t(pages[0].text)}
                            </Button>
                        </Link>
                        <MenuLink text={t(pages[1].text)} id={pages[1].id} url={pages[1].url} links={categories} />
                        <MenuLink text={t(pages[2].text)} id={pages[2].id} url={pages[2].url} links={dishes} />
                        <MenuLink text={t(pages[6].text)} id={pages[6].id} url={pages[6].url} links={tags} />
                        <Link to={pages[3].url} id={pages[3].id}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                {t(pages[3].text)}
                            </Button>
                        </Link>
                    </Box>
                    <MaterialUISwitch checked={theme.palette.mode === 'dark'} onChange={colorMode.toggleColorMode}/>
                    <UserMenuSection>
                        <Link to={pages[4].url} id={pages[4].id}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                {t(pages[4].text)}
                            </Button>
                        </Link>
                        <Link to={pages[5].url} id={pages[5].id}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                {t(pages[5].text)}
                            </Button>
                        </Link>
                    </UserMenuSection>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default Header;