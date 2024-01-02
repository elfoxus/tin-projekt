import logo from "./logo.svg";
import React from "react";
import "./HeaderLogo.css";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";

const HeaderLogo = () => {
    const { t } = useTranslation();
    return (
        <Link to="/" className="header-wrapper">
            <div className="header-logo">
                <img src={logo} className="App-logo" alt="logo" />
                <Typography component="h1" sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block'
                    }
                }}>{t('header.logo')}</Typography>
            </div>
            <span className="bottom"></span>
            <span className="right"></span>
            <span className="top"></span>
            <span className="left"></span>
        </Link>
    )
}

export default HeaderLogo;