import express from "express";
import getAllRecipes from "../usecases/recipes/get-all-recipes.usecase";
import getAllRecipesByDish from "../usecases/recipes/get-recipes-by-dish.usecase";
import getAllRecipesByCategory from "../usecases/recipes/get-recipes-by-category.usecase";

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

recipesController.get('/', (req, res) => {
    let pageQuery = req.query.page;
    let page = getPageFromQuery(pageQuery);
    getAllRecipes(page).then(recipes => {
        res.status(200).json(recipes);
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