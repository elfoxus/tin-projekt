import React, {Fragment, useEffect, useState} from 'react';
import Section from "../../Section/Section";
import axios from "axios";
import {Box, CircularProgress, Typography} from "@mui/material";
import {StyledRating} from "../StyledRating/StyledRating";
import {format} from 'date-fns';

const Comments = ({recipeId, rating}) => {

        const [comments, setComments] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            axios.get('/api/recipes/' + recipeId + '/comment')
                .then(response => {
                    setComments(response.data);
                    console.log(response.data);
                    setLoading(false);
                }).catch(error => {
                    console.log(error);
                });
        }, [recipeId]);

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
                    <Section>
                        <Box sx={{display: 'flex', gap: 2, flexDirection: 'column'}}>
                            <Box sx={{display: 'flex', gap: 3, alignItems: 'baseline', justifyContent: 'space-between'}}>
                                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                    <Typography variant={'h5'}>Komentarze</Typography>
                                    <StyledRating
                                        name="recipe-rating"
                                        size="large"
                                        value={rating}
                                        readOnly={true}
                                        precision={0.5}
                                    ></StyledRating>
                                </Box>
                            </Box>
                            <Box>
                                {comments.map(comment => (
                                    <Box key={comment.user.id + '-' + comment.date}>
                                        <Box sx={{display: 'flex', gap: 1, alignItems: 'baseline'}}>
                                            <Typography variant={'subtitle1'}>{comment.user.username}</Typography>
                                            <Typography variant={'subtitle2'}>{format(comment.date, 'HH:mm:ss dd.MM.yyyy')}</Typography>
                                            <StyledRating name="recipe-rating" size="small" value={comment.rating} readOnly={true} precision={0.5}></StyledRating>
                                        </Box>
                                        <Typography variant={'body2'}>
                                            {comment.comment}
                                        </Typography>
                                    </Box>
                                    ))}
                            </Box>
                        </Box>
                    </Section>
                }
            </Fragment>
        )
}

export default Comments;