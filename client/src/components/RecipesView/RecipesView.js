import React, {useEffect, useState} from 'react';
import RecipePreview from './RecipePreview/RecipePreview'
import Section from "../Section/Section";
import Box from "@mui/material/Box";
import api from "../../services/api";

const RecipesView = ({url, title = "", text = ""}) => {

        const [recipes, setRecipes] = useState([]);

        useEffect(() => {
            api.get(url)
                .then(response => {
                    setRecipes(response.data)
                })
                .catch(error => console.log(error));
        }, [url]);

        return (
            <Section title={title}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    flexWrap: { xs: 'no-wrap', md: 'wrap'},
                    alignItems: { xs: 'center', md: 'flex-start' },
                    alignSelf: { xs: 'center', md: 'flex-start' },
                    justifyContent: { xs: 'center', md: 'flex-start' }
                }}
                >
                    {recipes.map(item => {
                        return RecipePreview(item.id, item.name, item.description, item.image_path);
                    })}
                </Box>
            </Section>
        )
}

export default RecipesView;