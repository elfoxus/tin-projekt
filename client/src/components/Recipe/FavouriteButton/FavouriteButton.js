import React, {Fragment, useContext, useEffect, useState} from 'react';
import {UserContext} from "../../../services/auth";
import {IconButton} from "@mui/material";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import api from "../../../services/api";

const FavouriteButton = ({recipeId}) => {

    const {state} = useContext(UserContext);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        api.get('/favourites')
            .then(response => {
                let isFavorite = response.data.map(recipe => recipe.id + '').includes(recipeId);
                setFavorite(isFavorite)
            }).catch(error => {
                console.log(error)
            })
    }, [recipeId]);

    const onClick = () => {
        if (favorite) {
            api.delete('/favourites/' + recipeId)
                .then(response => {
                    setFavorite(false)
                }).catch(error => {
                    console.log(error)
                })
        } else {
            api.post('/favourites/' + recipeId)
                .then(response => {
                    setFavorite(true)
                }).catch(error => {
                    console.log(error)
                })
        }
    }


    return (
        <Fragment>
            {
                state.username &&
                    <IconButton onClick={onClick}>
                        {favorite ? <FavoriteOutlinedIcon color="primary" /> : <FavoriteBorderOutlinedIcon color="primary" />}
                    </IconButton>
            }
        </Fragment>
    )
}

export default FavouriteButton;