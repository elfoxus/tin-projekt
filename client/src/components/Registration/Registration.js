import React from "react";
import "./Registration.css";
import Section from "../Section/Section";

const Registration = () => {
    return (
        <Section title="Rejestracja" wrapperClasses="shrinked-panel centered-panel">
            <form>
                <div className="form-elem">
                    <label htmlFor="name">Imię:</label>
                    <span>
                        <input type="text" id="name" name="name" required/>
                        <span className="material-symbols-outlined">error</span>
                    </span>
                </div>

                <div className="form-elem">
                    <label htmlFor="surname">Nazwisko:</label>
                    <span>
                        <input type="text" id="surname" name="surname" required/>
                        <span className="material-symbols-outlined">error</span>
                    </span>

                </div>

                <div className="form-elem">
                    <label htmlFor="email">Adres e-mail:</label>
                    <span>
                        <input type="email" id="email" name="email" required/>
                        <span className="material-symbols-outlined">error</span>
                    </span>

                </div>

                <div className="form-elem">
                    <label htmlFor="password">Hasło:</label>
                    <span>
                        <input type="password" id="password" name="password" required/>
                        <span class="material-symbols-outlined">error</span>
                    </span>

                </div>

                <ul id="errors">
                </ul>

                <input id="submit" type="submit" value="Zarejestruj się" />
            </form>
        </Section>
    )
}

export default Registration;