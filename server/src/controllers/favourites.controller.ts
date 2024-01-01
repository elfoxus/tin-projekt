import express from 'express';
import verifyJWT from "../middleware/authRoutes";
import getFavourites from "../usecases/favourites/get-favourites.usecase";
import addToFavourites from "../usecases/favourites/add-to-favourites.usecase";
import removeFromFavourites from "../usecases/favourites/remove-from-favourites.usecase";

const router = express.Router();

router.route('/')
    .get(verifyJWT, (req, res) => {
        const user = res.locals.user;
        getFavourites(user.username)
            .then(favourites => {
                res.status(200).json(favourites);
            }).catch(e => {
                res.status(500).json({message: "Error getting favourites"});
            })
    });

router.route('/:recipeId')
    .post(verifyJWT, (req, res) => {
        const user = res.locals.user;
        try {
            var recipeId = parseInt(req.params.recipeId);
        } catch (e) {
            res.status(400).json({message: "Recipe ID is required"});
            return;
        }

        addToFavourites(recipeId, user.username)
            .then(message => {
                res.status(200).json(message);
            }).catch(e => {
                if(e.message === "User not found") {
                    res.status(400).json({message: "User does not exist"});
                    return;
                }
                res.status(500).json({message: "Error adding to favourites"});
            });
    })
    .delete(verifyJWT, (req, res) => {
        const user = res.locals.user;
        try {
            var recipeId = parseInt(req.params.recipeId);
        } catch (e) {
            res.status(400).json({message: "Recipe ID is required"});
            return;
        }
        removeFromFavourites(recipeId, user.username)
            .then(message => {
                res.status(200).json(message);
            }).catch(e => {
                if(e.message === "User not found") {
                    res.status(400).json({message: "User does not exist"});
                    return;
                }
                res.status(500).json({message: "Error removing from favourites"});
            });
    });

export default router;