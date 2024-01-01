import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import {StyledRating} from "../StyledRating/StyledRating";
import api from "../../../services/api";
import AddNewComment from "./AddNewComment/AddNewComment";
import {UserContext} from "../../../services/auth";
import dayjs from "dayjs";

const Comments = ({recipeId}) => {

        const [comments, setComments] = useState([]);
        const [loading, setLoading] = useState(true);
        const [added, setAdded] = useState(false);
        const [rating, setRating] = useState(3);
        const [reloadRating, setReloadRating] = useState(false);
        const {state} = useContext(UserContext);

        const callbackWhenAdded = () => {
            setAdded(!added); // reload comments
        }

        useEffect(() => {
            api.get('/recipes/' + recipeId + '/comment')
                .then(response => {
                    setComments(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
                    setLoading(false);
                }).catch(error => {
                    setLoading(false);
                });
        }, [recipeId, added, reloadRating]);

        useEffect(() => {
            api.get('/recipes/' + recipeId + '/rating')
                .then(response => {
                    setRating(response.data.rating);
                })
                .catch(error => {
                    console.log(error);
                })
        }, [state, reloadRating])

        const onRatingChange = (event, newValue) => {
            setRating(newValue);
            api.post('/recipes/' + recipeId + '/rating', {
                rating: newValue
            }).then(response => {
                setReloadRating(!reloadRating);
            }).catch(error => {
                console.log(error);
            });
        }

        return (
            <Fragment>
                {loading ?
                        <Box sx={{display: 'flex', gap: 1, alignItems: 'baseline'}}>
                            <CircularProgress />
                            <Typography variant={'h4'}>Trwa ładowanie...</Typography>
                        </Box>

                :
                        <Box sx={{display: 'flex', gap: 2, flexDirection: 'column', marginTop: 1, width: '100%'}}>
                            <Box sx={{display: 'flex', gap: 3, alignItems: 'baseline', justifyContent: 'space-between'}}>
                                <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                                    <Typography variant={'h5'}>Komentarze</Typography>
                                    {state.username &&
                                    <StyledRating
                                        name="recipe-rating"
                                        size="large"
                                        value={rating}
                                        onChange={onRatingChange}
                                        precision={1}
                                    ></StyledRating>}
                                </Box>
                            </Box>
                            <AddNewComment recipeId={recipeId} callback={callbackWhenAdded} />
                            <Box>
                                {comments.map(comment => (
                                    <Box key={comment.user.id + '-' + comment.date.toString()}>
                                        <Box sx={{display: 'flex', gap: 1, alignItems: 'baseline'}}>
                                            <Typography variant={'subtitle1'}>{comment.user.username}</Typography>
                                            <Typography variant={'subtitle2'}>{dayjs(comment.date).format('HH:mm:ss dd.MM.yyyy')}</Typography>
                                            {comment.rating >= 0 && <StyledRating name="recipe-rating" size="small" value={comment.rating} readOnly={true} precision={0.5}></StyledRating>}
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