import React, {Fragment, useEffect, useState} from 'react';
import Section from "../Section/Section";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, ButtonGroup, CircularProgress, Rating, styled, Typography} from "@mui/material";
import './Recipe.css';
import {getMinutes, getHours} from "date-fns";
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import Comments from "./Comments/Comments";
import {StyledRating} from "./StyledRating/StyledRating";
import api from "../../services/api";


const Recipe = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        api.get('/recipes/' + id)
            .then(response => {
                setRecipe(response.data);
                setLoading(false);
            }).catch(error => {
                console.log(error);
                error.response.status === 404 ? navigate('/404') : navigate('/500');
            });
    }, [id]);

    return (
        <Fragment>
            {loading ?
                <Section>
                    <Box sx={{display: 'flex', gap: 1, alignItems: 'baseline'}}>
                        <CircularProgress />
                        <Typography variant={'h4'}>Trwa ładowanie...</Typography>
                    </Box>

                </Section>
            :
                <Fragment>
                    <Section>
                        <Box sx={{display: 'flex', gap: 2, flexDirection: 'column'}}>
                            <Box sx={{display: 'flex', gap: 3, alignItems: 'baseline', justifyContent: 'space-between'}}>
                                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                    <Typography variant={'h5'}>{recipe.name}</Typography>
                                    <StyledRating
                                        name="recipe-rating"
                                        size="large"
                                        value={recipe.rating}
                                        readOnly={true}
                                        precision={0.5}
                                    ></StyledRating>
                                </Box>
                            </Box>
                            <img src={"http://localhost:3001/" + recipe.image_path} alt={recipe.name} className="recipe-img"/>
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                <BookmarksOutlinedIcon />
                                <ButtonGroup size="small" variant="outlined" aria-label="Powiązane informacje z przepisem">
                                    {recipe.dishes.map(dish => <Button>{dish}</Button>)}
                                    {recipe.categories.map(category => <Button>{category}</Button>)}
                                    {recipe.tags.map(tag => <Button>{tag}</Button>)}
                                </ButtonGroup>
                            </Box>
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                <AlarmRoundedIcon />
                                <Typography>
                                    Czas gotowania: {getHours(recipe.cook_time) > 0 ? getHours(recipe.cook_time) + ' godz. ' : ''} {getMinutes(recipe.cook_time)} min.
                                </Typography>
                            </Box>
                            <Typography variant={'body1'}>
                                {recipe.description}
                            </Typography>
                            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 12, sm: 12}}>
                                <Grid item xs={12} sm={4}>
                                    <Box sx={{display: 'flex', gap: 3, alignItems: 'baseline'}}>
                                        <Typography variant={'h6'}>Składniki</Typography>
                                        <Typography variant={'subtitle1'}> / {recipe.servings} porcje</Typography>
                                    </Box>
                                    <Box>
                                        {recipe.ingredients.map(ingredient => <Typography key={ingredient} variant={'body1'}>{ingredient}</Typography>)}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant={'h6'}>Przygotowanie</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Comments recipeId={id} rating={recipe.rating} />
                    </Section>
                </Fragment>
            }
        </Fragment>

    )
}

export default Recipe;