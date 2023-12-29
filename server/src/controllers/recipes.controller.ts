import express from "express";
import getAllRecipes from "../usecases/recipes/get-all-recipes.usecase";
import getAllRecipesByDish from "../usecases/recipes/get-recipes-by-dish.usecase";
import getAllRecipesByCategory from "../usecases/recipes/get-recipes-by-category.usecase";
import getRecipeDetails from "../usecases/recipes/get-recipe.usecase";
import getRecipeComments from "../usecases/comments/get-recipe-comments.usecase";
import verifyJWT from "../middleware/authRoutes";
import addCommentToRecipe from "../usecases/comments/add-comment.usecase";
import upsertRating from "../usecases/ratings/set-recipe-rating.usecase";
import getRecipeRatingForUser from "../usecases/ratings/get-recipe-rating.usecase";

const recipesController = express.Router();

function getPageFromQuery(pageQuery: any) {
    let page = 0;
    if (typeof pageQuery === 'string') {
        try {
            page = parseInt(pageQuery);
        } catch (e) {
            console.log("Error parsing page query: " + pageQuery + ", error: " + e + ", defaulting to page 0.");
        }
    }
    return page;
}

recipesController.route('/')
    .get( (req, res) => {
        let pageQuery = req.query.page;
        let page = getPageFromQuery(pageQuery);
        getAllRecipes(page).then(recipes => {
            res.status(200).json(recipes);
        });
    })
    .post(verifyJWT, (req, res) => {
        res.send("Not implemented"); // TODO: Implement
    });

recipesController.get('/:id', (req, res) => {
    try {
        let id = parseInt(req.params.id);

        getRecipeDetails(id).then(recipe => {
            if (!recipe) {
                res.status(404).json({message: "Recipe not found"});
            } else {
                res.status(200).json(recipe);
            }
        }).catch(e => {
            res.status(500).json({message: "Error getting recipe"});
        });
    } catch (e) {
        res.status(404).json({message: "Error getting recipe"});
    }
});

// -1 or 0-5
recipesController.route('/:id/rating')
    .get(verifyJWT, (req, res) => {
        const user = res.locals.user;
        try {
            var recipeId = parseInt(req.params.id);
        } catch (e) {
            res.status(400).json({message: "Recipe ID is required"});
            return;
        }

        getRecipeRatingForUser(recipeId, user.username)
            .then(rating => {
                res.status(200).json({rating: rating});
            }).catch(e => {
                if(e.message === "User not found") {
                    res.status(400).json({message: "User does not exist"});
                    return;
                }
                res.status(500).json({message: "Error getting rating"});
            });
    })
    .post(verifyJWT, (req, res) => {
        const user = res.locals.user;
        try {
            var recipeId = parseInt(req.params.id);
        } catch (e) {
            res.status(400).json({message: "Recipe ID is required"});
            return;
        }

        const rating = req.body.rating;
        if (typeof rating !== 'number' || rating < 0 || rating > 5) {
            res.status(400).json({message: "Rating must be a number between 0 and 5"});
            return;
        }
        upsertRating(recipeId, user.username, rating)
            .then(message => {
                res.status(200).json({message: message});
            }).catch(e => {
                if(e.message === "User not found") {
                    res.status(400).json({message: "User does not exist"});
                    return;
                }
                res.status(500).json({message: "Error adding rating"});
            });
    })
    .delete(verifyJWT, (req, res) => {
        const { username, role } = res.locals.user;
        try {
            var recipeId = parseInt(req.params.id);
        } catch (e) {
            res.status(400).json({message: "Recipe ID is required"});
            return;
        }

        res.status(501).json({message: "Not implemented"})
    });


recipesController.route('/:id/comment')
    .get((req, res) => {
        try {
            let id = parseInt(req.params.id);

            getRecipeComments(id).then(comments => {
                res.status(200).json(comments);
            }).catch(e => {
                res.status(500).json({message: "Error getting comments"});
            });
        } catch (e) {
            res.status(404).json({message: "Error getting comments"});
        }
    })
    .post(verifyJWT, (req, res) => {
        const user = res.locals.user;
        try {
            var recipeId = parseInt(req.params.id);
        } catch (e) {
            res.status(400).json({message: "Recipe ID is required"});
            return;
        }

        const comment = req.body.comment;
        if (!comment || comment === "") {
            res.status(400).json({message: "Comment is required"});
            return;
        }
        addCommentToRecipe(recipeId, user.username, comment)
            .then(message => {
                res.status(200).json({message: message});
            }).catch(e => {
                console.log(e)
                if(e.message === "User not found") {
                    res.status(400).json({message: "User does not exist"});
                    return;
                }
                res.status(500).json({message: "Error adding comment"});
            });
    });

recipesController.route('/dish/:dishName')
    .get((req, res) => {
        let dishName = req.params.dishName;
        let pageQuery = req.query.page;
        let page = getPageFromQuery(pageQuery);
        getAllRecipesByDish(dishName, page).then(recipes => {
            res.status(200).json(recipes);
        });
    });

recipesController.route('/category/:categoryName')
    .get((req, res) => {
        let categoryName = req.params.categoryName;
        let pageQuery = req.query.page;
        let page = getPageFromQuery(pageQuery);
        getAllRecipesByCategory(categoryName, page).then(recipes => {
            res.status(200).json(recipes);
        });
    });

export default recipesController;