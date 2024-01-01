import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import {StyledRating} from "../StyledRating/StyledRating";
import api from "../../../services/api";
import AddNewComment from "./AddNewComment/AddNewComment";
import {UserContext} from "../../../services/auth";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import {getRandomColor} from "../../../services/colors";

const Comments = ({recipeId}) => {

        const [comments, setComments] = useState([]);
        const [loading, setLoading] = useState(true);
        const [added, setAdded] = useState(false);
        const [rating, setRating] = useState(3);
        const [reloadRating, setReloadRating] = useState(false);
        const [authorColors, setAuthorColors] = useState(new Map());
        const {state} = useContext(UserContext);

        const callbackWhenAdded = () => {
            setAdded(!added); // reload comments
        }

        useEffect(() => {
            api.get('/recipes/' + recipeId + '/comment')
                .then(response => {

                    response.data.map((review) => {
                        if (!authorColors.has(review.user.id)) {
                            authorColors.set(review.user.id, getRandomColor());
                        }
                    })

                    var reviews = response.data
                        .map((comment) => {
                            return {
                                id: comment.id,
                                date: comment.date,
                                comment: comment.comment,
                                rating: comment.rating,
                                recipe_id: comment.recipe_id,
                                user: {
                                    id: comment.user.id,
                                    username: comment.user.username,
                                    color: authorColors.get(comment.user.id)
                                }
                            }})
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                    setComments(reviews);
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

    function deleteComment(id) {
            api.delete('/comments/' + id)
                .then(response => {
                    setAdded(!added); // reload comments
                })
                .catch(error => {
                    console.log(error.message);
                })
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
                            <Stack gap={1}divider={<Divider orientation="horizontal" flexItem />} >
                                {comments.map(comment => (
                                    <Stack alignItems="flex-start" direction="row" gap={2} key={comment.user.id + '-' + comment.date.toString()}>
                                        <Box sx={{padding: 1}}>
                                            <Avatar sx={{bgcolor: comment.user.color }}>
                                                {comment.user.username.substring(0, 1).toUpperCase()}
                                            </Avatar>
                                        </Box>
                                        <Stack sx={
                                            {
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                borderRadius: 1,
                                                padding: 1,
                                                minWidth: {
                                                    md: '75%',
                                                },
                                                flex: {
                                                    xs: '1 1 0',
                                                    md: '0 1 0',
                                                }
                                            }
                                        }>
                                            <Stack>
                                                <Typography variant={'subtitle1'} sx={{fontWeight: '600'}} >{comment.user.username}</Typography>
                                                <Typography variant={'body2'}>
                                                    {comment.comment}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" gap={1}>
                                                <Stack direction="row" gap={1}>
                                                    <Typography variant={'caption'} >{dayjs(comment.date).format('HH:mm:ss ddd MMM YYYY')}</Typography>
                                                    {comment.rating >= 0 && <StyledRating name="recipe-rating" size="small" value={comment.rating} readOnly={true} precision={0.5}></StyledRating>}
                                                </Stack>
                                                <Box sx={{ marginLeft: 'auto' }}>
                                                    {((state.username === comment.user.username)
                                                        || state.role === 'ADMIN'
                                                        || state.role === 'MODERATOR') &&
                                                        <IconButton onClick={() => deleteComment(comment.id)}>
                                                            <DeleteOutlineOutlinedIcon />
                                                        </IconButton>
                                                    }
                                                </Box>

                                            </Stack>
                                        </Stack>
                                    </Stack>
                                    ))}
                            </Stack>
                        </Box>
                }
            </Fragment>
        )
}

export default Comments;