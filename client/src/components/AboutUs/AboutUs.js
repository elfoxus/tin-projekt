import React from "react";
import Section from "../Section/Section";
import {Typography} from "@mui/material";

const AboutUs = () => {
    return (
        <Section title="O nas">
            <Typography>Witaj na naszej stronie z przepisami kulinarnymi! Jesteśmy pasjonatami gotowania i chcemy podzielić się z Tobą naszą miłością do jedzenia. Nasza strona oferuje bogatą kolekcję przepisów na różnorodne dania, od prostych potraw codziennych po wykwintne dania przygotowywane na specjalne okazje.</Typography>
            <Typography>Nasze przepisy są starannie wyselekcjonowane, a każdy z nich został przetestowany, aby zapewnić smaczne i satysfakcjonujące doświadczenie kulinarne. Bez względu na to, czy jesteś początkującym kucharzem, czy doświadczonym szefem kuchni, znajdziesz tu coś dla siebie.</Typography>
            <Typography>Chcielibyśmy również podziękować naszej wspaniałej społeczności kulinarnych entuzjastów za wsparcie i dzielenie się swoimi pomysłami na naszej stronie. To dzięki Wam możemy stale rozwijać naszą kolekcję przepisów i dostarczać nowe inspiracje kulinarne.</Typography>
            <Typography>Zapraszamy do eksploracji naszych przepisów i dołączenia do naszej społeczności kulinarnych miłośników.</Typography>
            <Typography>Gotując z naszymi przepisami masz gwarancję:
                <ul>
                    <li>Starannie wyselekcjonowanych przepisów</li>
                    <li>Wsparcia społeczności kulinarnych entuzjastów</li>
                    <li>Nowych inspiracji kulinarnych</li>
                </ul>
            </Typography>
        </Section>
    )
}

export default AboutUs;