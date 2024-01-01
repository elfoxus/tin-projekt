import React, {Fragment, useEffect, useState} from 'react';
import Section from "../Section/Section";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, ButtonGroup, CircularProgress, Rating, styled, Typography} from "@mui/material";
import AlarmRoundedIcon from '@mui/icons-material/AlarmRounded';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import Grid from '@mui/material/Unstable_Grid2';
import Comments from "./Comments/Comments";
import {StyledRating} from "./StyledRating/StyledRating";
import api from "../../services/api";
import FavouriteButton from "./FavouriteButton/FavouriteButton";
import dayjs from "dayjs";
import ClickableImage from "./ClickableImage/ClickableImage";


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
                        <Box sx={{display: 'flex', gap: 2, flexDirection: 'column', width: '100%'}}>
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
                                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                    <FavouriteButton recipeId={id} />
                                </Box>
                            </Box>
                            <ClickableImage image={recipe.image_path} name={recipe.name} />
                            <Box sx={{display: 'flex', gap: 1}}>
                                <BookmarksOutlinedIcon />
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center'}}>
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center'}} aria-label="Powiązane kategorie z przepisem">
                                        {recipe.categories.map(category => <Button size="small" variant="outlined" key={category} href={'/category/' + category}>{category}</Button>)}
                                    </Box>
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center'}} aria-label="Powiązane dania z przepisem">
                                        {recipe.dishes.map(dish => <Button size="small" variant="outlined" key={dish} href={'/dish/' + dish}>{dish}</Button>)}
                                    </Box>
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center'}} aria-label="Powiązane tagi z przepisem">
                                        {recipe.tags.map(tag => <Button size="small" variant="outlined" key={tag} href={'/'}>{tag}</Button>)}
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                <AlarmRoundedIcon />
                                <Typography>
                                    Czas gotowania: {dayjs(recipe.cook_time).hour() > 0 ? dayjs(recipe.cook_time).hour() + ' godz. ' : ''} {dayjs(recipe.cook_time).minute()} min.
                                </Typography>
                            </Box>
                            <Typography variant={'body1'}>
                                {recipe.description}
                            </Typography>
                            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 12, md: 12}}>
                                <Grid item="true" xs={12} md={4}>
                                    <Box sx={{display: 'flex', gap: 3, alignItems: 'baseline', paddingBottom: 1}}>
                                        <Typography variant={'h6'}>Składniki</Typography>
                                        <Typography variant={'subtitle1'}> / {recipe.servings} porcje</Typography>
                                    </Box>
                                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                        {recipe.ingredients.map(ingredient => <Typography key={ingredient} variant={'body2'}>{ingredient}</Typography>)}
                                    </Box>
                                </Grid>
                                <Grid item="true" xs={12} md={8}>
                                    <Typography variant={'h6'} component="h3" sx={{paddingBottom: 1}}>Przygotowanie</Typography>
                                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                        {recipe.steps.sort((a, b) => a.number - b.number)
                                            .map(step => <Typography key={step.number} variant={'body1'}>{step.number}. {step.description}</Typography>)}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Comments recipeId={id} />
                    </Section>
                </Fragment>
            }
        </Fragment>

    )
}

export default Recipe;