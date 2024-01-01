import { Request, Response } from "express";
import {getHours, getMinutes, parse} from 'date-fns'
import {AddRecipeData, RecipeAddRequest} from "../model/recipe";
import {set} from "date-fns/set";

import getAllRecipes from "../usecases/recipes/get-all-recipes.usecase";
import getAllRecipesByDish from "../usecases/recipes/get-recipes-by-dish.usecase";
import getAllRecipesByCategory from "../usecases/recipes/get-recipes-by-category.usecase";
import getRecipeDetails from "../usecases/recipes/get-recipe.usecase";
import getRecipeComments from "../usecases/comments/get-recipe-comments.usecase";
import addCommentToRecipe from "../usecases/comments/add-comment.usecase";
import upsertRating from "../usecases/ratings/set-recipe-rating.usecase";
import getRecipeRatingForUser from "../usecases/ratings/get-recipe-rating.usecase";
import getAllRecipesByTag from "../usecases/recipes/get-recipes-by-tag.usecase";
import addRecipe from "../usecases/recipes/add-recipe.usecase";
import getUserRecipes from "../usecases/recipes/get-user-recipes.usecase";


const myRecipes = (req: Request, res: Response) => {
    const { username, role } = res.locals.user;
    getUserRecipes(username).then(recipes => {
        res.status(200).json(recipes);
    });
}


const allRecipes = (req: Request, res: Response) => {
    getAllRecipes().then(recipes => {
        res.status(200).json(recipes);
    });
}

const newRecipe = (req: Request, res: Response) => {
    const { username, role } = res.locals.user;

    const recipe: RecipeAddRequest = {
        name: req.body.name,
        description: req.body.description,
        servings: parseInt(req.body.servings),
        time: req.body.time,
        ingredients: req.body.ingredients,
        steps: req.body.steps.map( (step: {number: string, name: string} ) => {
            return {
                number: parseInt(step.number),
                name: step.name
            }
        }),
        dishes: req.body.dishes,
        categories: req.body.categories,
        tags: req.body.tags
    };
    if (!recipe) {
        res.status(400).json({message: "Recipe is required"});
        return;
    }

    const files = req.files as {image: Express.Multer.File[]};
    const image = files?.image?.[0];

    validateRecipe(recipe, image)
        .then(validated => {
            const recipeData: AddRecipeData = {
                username: username,
                name: validated.name,
                description: validated.description,
                servings: validated.servings,
                cook_time: set(new Date(), {
                    hours: getHours(parse(validated.time, 'HH:mm', new Date())),
                    minutes: getMinutes(parse(validated.time, 'HH:mm', new Date()))
                }),
                ingredients: validated.ingredients,
                steps: validated.steps,
                dishes: validated.dishes,
                categories: validated.categories,
                tags: validated.tags,
                image: image
            }
            return recipeData;
        }).then(recipeData => {
            return addRecipe(recipeData);
        }).then(recipeId => {
            res.status(200).json({message: "Recipe added", recipeId: recipeId});
        })
        .catch(err => {
            res.status(400)
                .json({
                    message: err.message,
                    invalidFields: err.invalidFields
                })
        });
};

function validateRecipe(recipe: RecipeAddRequest, image: Express.Multer.File | undefined): Promise<RecipeAddRequest> {
    const invalidFields: string[] = [];

    if (!image || !image.mimetype.includes('image/')) {
        invalidFields.push('image');
    }

    if (!recipe.name || recipe.name === "" || recipe.name.length > 50) {
        invalidFields.push('name');
    }
    if (!recipe.description || recipe.description === "" || recipe.description.length > 511) {
        invalidFields.push('description');
    }
    const empty = (ingredient: string) => ingredient === "";
    if (!recipe.ingredients
        || recipe.ingredients.length === 0
        || recipe.ingredients.some(empty)
    ) {
        invalidFields.push('ingredients');
    }
    const stepEmpty = (step: {number: number, name: string}) => !step.number || !step.name || step.name === "";
    if (!recipe.steps
        || recipe.steps.length === 0
        || recipe.steps.some(stepEmpty)
    ) {
        invalidFields.push('steps');
    }
    if (!recipe.dishes
        || recipe.dishes.length === 0
        || recipe.dishes.some(empty)
    ) {
        invalidFields.push('dishes');
    }
    if (!recipe.categories
        || recipe.categories.length === 0
        || recipe.categories.some(empty)
    ) {
        invalidFields.push('categories');
    }
    if (!recipe.tags
        || recipe.tags.length === 0
        || recipe.tags.some(empty)
    ) {
        invalidFields.push('tags');
    }
    const dateFormat = 'HH:mm';
    if (!recipe.time
        || (getHours(parse(recipe.time, dateFormat, new Date())) == 0 && getMinutes(parse(recipe.time, dateFormat, new Date())) == 0)
        || getHours(parse(recipe.time, dateFormat, new Date())) > 24 || getMinutes(parse(recipe.time, dateFormat, new Date())) > 59) {
        invalidFields.push('time');
    }
    if (!recipe.servings || recipe.servings < 1 || recipe.servings > 10) {
        invalidFields.push('servings');
    }

    if (invalidFields.length > 0) {
        const error: RecipeValidationError = new RecipeValidationError('Invalid fields.', invalidFields);
        return Promise.reject(error);
    }
    return Promise.resolve(recipe);
}

class RecipeValidationError extends Error {
    invalidFields: string[];
    constructor(message: string, invalidFields: string[]) {
        super(message);
        this.invalidFields = invalidFields;
    }
}

const getRecipe = (req: Request, res: Response) => {
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
}

// -1 or 0-5
const getRating =  (req: Request, res: Response) => {
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
};

const newRating = (req: Request, res: Response) => {
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
};


const recipeComments = (req: Request, res: Response) => {
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
}

const newComment = (req: Request, res: Response) => {
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
};

const deleteComment = (req: Request, res: Response) => {
    res.status(501).json({message: "Not implemented"});
}

const getRecipesByDish =(req: Request, res: Response) => {
    let dishName = req.params.dishName;
    getAllRecipesByDish(dishName).then(recipes => {
        res.status(200).json(recipes);
    });
};

const getRecipesByCategory = (req: Request, res: Response) => {
    let categoryName = req.params.categoryName;
    getAllRecipesByCategory(categoryName).then(recipes => {
        res.status(200).json(recipes);
    });
};

const getRecipesByTag = (req: Request, res: Response) => {
    let tagName = req.params.tagName;
    getAllRecipesByTag(tagName).then(recipes => {
        res.status(200).json(recipes);
    });
}


export {
    allRecipes,
    newRecipe,
    myRecipes,
    getRecipe,
    getRating,
    newRating,
    recipeComments,
    newComment,
    deleteComment,
    getRecipesByDish,
    getRecipesByCategory,
    getRecipesByTag
}