import React, {Fragment, useContext, useState} from "react";
import {Button, CircularProgress, Container, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {UserContext} from "../../../../services/auth";
import api from "../../../../services/api";

const AddNewComment = ({recipeId, callback}) => {

    const {state} = useContext(UserContext);

    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const handleCommentChange = (event) => {
        let newComment = event.target.value;
        if (newComment.length > 255) newComment = newComment.substring(0, 255);
        setComment(newComment);
        if(newComment.length === 0 || newComment.length > 255) {
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
        }
    }

    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        api.post('/recipes/' + recipeId + '/comment', {
            comment
        }).then(success => {
            console.log(success.data)
            setComment('')
            setLoading(false);
            callback();
        }).catch(error => {
            setLoading(false);
            setComment('');
            if (error.response?.data?.message) {
                console.log(error.response.data.message);
            }

        });
    }

    return (
        <Fragment>
            {state.username &&
                <Container disableGutters sx={{display: 'flex', alignItems: 'center', gap: 2}} component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        disabled={loading}
                        value={comment}
                        id="write-comment"
                        placeholder="Napisz komentarz..."
                        multiline
                        rows={3}
                        sx={{flex: '1 1 auto'}}
                        onChange={handleCommentChange}
                    />
                    <Button
                        variant="contained"
                        disabled={btnDisabled || loading}
                        type="submit"
                        endIcon={<SendIcon />}
                    >Wyślij
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}</Button>
                </Container>
            }
        </Fragment>
    )
}

export default AddNewComment;