import {prisma} from "../../services/db/prisma";
import {saveImage} from "../../services/storage/image.service";
import {AddRecipeData} from "../../model/recipe";

export default async function addRecipe(recipe: AddRecipeData): Promise<number> {
    const image_id: string = saveImage(recipe.image);
    return prisma.user.findUnique({where: {username: recipe.username}})
        .then(async (user) => {
            if (!user) {
                throw new Error("User not found");
            }

            let userId = user.id;


            const dishIds = await prisma.dish.findMany({
                where: {
                    name: {
                        in: recipe.dishes
                    }
                }
            });

            const categoryIds = await prisma.category.findMany({
                where: {
                    name: {
                        in: recipe.categories
                    }
                }
            });

            const tagIds = await prisma.tag.findMany({
                where: {
                    name: {
                        in: recipe.tags
                    }
                }
            });

            return prisma.recipe.create({
                data: {
                    author_id: userId,
                    name: recipe.name,
                    description: recipe.description,
                    cook_time: recipe.cook_time,
                    servings: recipe.servings,
                    image_id: image_id,
                    ingredient: {
                        createMany: {
                            skipDuplicates: true,
                            data: recipe.ingredients.map(ingredient => {
                                return {
                                    name: ingredient
                                }
                            })
                        }
                    },
                    recipe_step: {
                        createMany: {
                            skipDuplicates: true,
                            data: recipe.steps.map(step => {
                                return {
                                    number: step.number,
                                    description: step.name
                                }
                            })
                        }
                    },
                    recipe_has_dish: {
                        createMany: {
                            skipDuplicates: true,
                            data: dishIds.map(dish => {
                                return {
                                    dish_id: dish.id
                                }
                            })
                        }
                    },
                    recipe_has_tag: {
                        createMany: {
                            skipDuplicates: true,
                            data: tagIds.map(tag => {
                                return {
                                    tag_id: tag.id
                                }
                            })
                        }
                    },
                    recipe_has_category: {
                        createMany: {
                            skipDuplicates: true,
                            data: categoryIds.map(category => {
                                return {
                                    category_id: category.id
                                }
                            })
                        }
                    }
                }
            }).catch((err) => {
                console.log(err);
                throw new Error("Error creating recipe");
            });
        })
        .then(recipe => {
            return recipe.id;
        })
}