import React from "react";
import Section from "../Section/Section";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AboutUs = () => {

    const dots = [
        "Starannie wyselekcjonowane przepisy",
        "Wsparcie społeczności kulinarnych entuzjastów",
        "Nowe inspiracje kulinarnych"
    ]

    return (
        <Section title="O nas">
            <Box sx={{paddingLeft: 1}}>
                <Typography variant={"body1"}>Witaj na naszej stronie z przepisami kulinarnymi! Jesteśmy pasjonatami gotowania i chcemy podzielić się z Tobą naszą miłością do jedzenia. Nasza strona oferuje bogatą kolekcję przepisów na różnorodne dania, od prostych potraw codziennych po wykwintne dania przygotowywane na specjalne okazje.</Typography>
                <Typography variant={"body1"}>Nasze przepisy są starannie wyselekcjonowane, a każdy z nich został przetestowany, aby zapewnić smaczne i satysfakcjonujące doświadczenie kulinarne. Bez względu na to, czy jesteś początkującym kucharzem, czy doświadczonym szefem kuchni, znajdziesz tu coś dla siebie.</Typography>
                <Typography variant={"body1"}>Chcielibyśmy również podziękować naszej wspaniałej społeczności kulinarnych entuzjastów za wsparcie i dzielenie się swoimi pomysłami na naszej stronie. To dzięki Wam możemy stale rozwijać naszą kolekcję przepisów i dostarczać nowe inspiracje kulinarne.</Typography>
                <Typography variant={"body1"}>Zapraszamy do eksploracji naszych przepisów i dołączenia do naszej społeczności kulinarnych miłośników.</Typography>
                <Typography variant={"body1"}>Gotując z naszymi przepisami masz gwarancję:
                    {dots.map((dot, index) =>
                        <Typography sx={{ marginLeft: 2}} variant={"body1"} key={index}>- {dot}</Typography>
                    )}
                </Typography>
            </Box>
        </Section>
    )
}

export default AboutUs;