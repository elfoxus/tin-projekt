import logo from "./logo.svg";
import React from "react";
import "./HeaderLogo.css";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";

const HeaderLogo = () => {
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
                }}>Recipes Online</Typography>
            </div>
            <span className="bottom"></span>
            <span className="right"></span>
            <span className="top"></span>
            <span className="left"></span>
        </Link>
    )
}

export default HeaderLogo;