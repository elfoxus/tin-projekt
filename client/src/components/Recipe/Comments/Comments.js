import React, {Fragment, useEffect, useState} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import {StyledRating} from "../StyledRating/StyledRating";
import {format} from 'date-fns';
import api from "../../../services/api";

const Comments = ({recipeId, rating}) => {

        const [comments, setComments] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            api.get('/recipes/' + recipeId + '/comment')
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
                        <Box sx={{display: 'flex', gap: 1, alignItems: 'baseline'}}>
                            <CircularProgress />
                            <Typography variant={'h4'}>Trwa ładowanie...</Typography>
                        </Box>

                :
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
                }
            </Fragment>
        )
}

export default Comments;