import React, {useEffect, useState} from 'react';
import RecipePreview from './RecipePreview/RecipePreview'
import Section from "../Section/Section";
import Box from "@mui/material/Box";
import api from "../../services/api";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const RecipesView = ({url, title = "", text = ""}) => {

        const [recipes, setRecipes] = useState([]);
        const [page, setPage] = useState(1);
        const [pageCount, setPageCount] = useState(0); // recipes.length / pageSize
        const pageSize = 6; // number of recipes per page
        const [pageRecipes, setPageRecipes] = useState([]);

        useEffect(() => {
            api.get(url)
                .then(response => {
                    const new_recipes = response.data;
                    setRecipes(response.data)
                    setPageRecipes(new_recipes.slice(0, pageSize))
                    setPageCount(Math.ceil(response.data.length / pageSize))
                    setPage(1)
                })
                .catch(error => console.log(error));
        }, [url]);

        useEffect(() => {
            recipes && setPageRecipes(recipes.slice((page - 1) * pageSize, page * pageSize))
        }, [page]);


        return (
            <Section title={title}>
                <Stack spacing={2} alignItems="center" sx={{width: '100%'}}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        flexWrap: { xs: 'no-wrap', md: 'wrap'},
                        alignItems: { xs: 'center', md: 'flex-start' },
                        alignSelf: { xs: 'center', md: 'flex-start' },
                        justifyContent: { md: 'center', lg: 'flex-start' }
                    }}
                    >
                        {pageRecipes.map(item => {
                            return RecipePreview(item.id, item.name, item.description, item.image_path);
                        })}
                    </Box>
                    <Pagination count={pageCount} onChange={(e, page) => setPage(page)}/>
                </Stack>
            </Section>
        )
}

export default RecipesView;