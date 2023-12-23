import React from "react";
import "./Login.css";
import Section from "../Section/Section";

const Login = () => {
    return (
        <Section title="Logowanie" wrapperClasses="shrinked-panel centered-panel">
            <form>
                <div className="form-elem">
                    <label htmlFor="email">Adres e-mail:</label>
                    <span>
                    <input type="email" id="email" name="email" required />
                    <span className="material-symbols-outlined">error</span>
                </span>

                </div>

                <div className="form-elem">
                    <label htmlFor="password">Hasło:</label>
                    <span>
                    <input type="password" id="password" name="password" required />
                    <span className="material-symbols-outlined">error</span>
                </span>

                </div>

                <ul id="errors">
                </ul>

                <input id="submit" type="submit" value="Zaloguj" />
            </form>
        </Section>
    )
}

export default Login;