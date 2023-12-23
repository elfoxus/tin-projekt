import logo from "./logo.svg";
import React from "react";
import "./HeaderLogo.css";
import {Link} from "react-router-dom";

const HeaderLogo = () => {
    return (
        <Link to="/" className="header-wrapper">
            <div className="header-logo">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Recipes Online</h1>
            </div>
            <span className="bottom"></span>
            <span className="right"></span>
            <span className="top"></span>
            <span className="left"></span>
        </Link>
    )
}

export default HeaderLogo;