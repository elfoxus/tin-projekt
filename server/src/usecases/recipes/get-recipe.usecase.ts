import {prisma} from "../../services/db/prisma";
import {findPath} from "../../services/storage/image.service";
import {RecipeDetails} from "../../model/recipe";


export default function getRecipeDetails(id: number): Promise<RecipeDetails | null> {
    return prisma.recipe.findUnique({
        where: {
            id: id
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            },
            ingredient: {
                select: {
                    name: true
                }
            },
            recipe_step: {
                select: {
                    number: true,
                    description: true
                }
            },
            recipe_rating: {
                select: {
                    rating: true
                }
            },
            recipe_has_dish: {
                select: {
                    dish: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            recipe_has_category: {
                select: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            recipe_has_tag: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    }).then(recipe => {
        if (!recipe) {
            return null;
        }
        const data: RecipeDetails = {
            id: recipe.id,
            name: recipe.name,
            cook_time: recipe.cook_time,
            servings: recipe.servings,
            rating: recipe.recipe_rating.map(rating => rating.rating).reduce((a, b) => a + b, 0) / recipe.recipe_rating.length,
            ingredients: recipe.ingredient.map(ingredient => ingredient.name),
            dishes: recipe.recipe_has_dish.map(dish => dish.dish.name),
            categories: recipe.recipe_has_category.map(category => category.category.name),
            tags: recipe.recipe_has_tag.map(tag => tag.tag.name),
            steps: recipe.recipe_step
        }
        recipe.user && (data.author = recipe.user);
        recipe.description && (data.description = recipe.description);
        let path;
        recipe.image_id && (path = findPath(recipe.image_id)) && (data.image_path = path);

        return data;
    })
}