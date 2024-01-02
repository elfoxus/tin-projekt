import React, { useEffect, useState} from "react";
import Section from "../Section/Section";
import api from "../../services/api";
import {Box, Button} from "@mui/material";
import {useTranslation} from "react-i18next";

const Favourites = () => {
    const { t } = useTranslation();
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        api.get('/favourites')
            .then(response => {
                console.log(response.data)
                setFavourites(response.data)
            }).catch(error => {
                console.log(error)
            })

    }, []);

    return (
        <Section title={t('fav.title')}>
            <Box sx={{marginTop: 2, display: 'flex', flexDirection: 'column', gap: 1}}>
                {favourites.map((recipe) =>
                    <Button variant="outlined" color="primary" href={`/recipe/${recipe.id}`} key={recipe.id}>{recipe.name}</Button>
                )}
            </Box>

        </Section>
    )
}

export default Favourites;