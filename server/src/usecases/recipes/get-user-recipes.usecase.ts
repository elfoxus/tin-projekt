import {prisma} from "../../services/db/prisma";
import {RecipeCardData} from "../../model/recipe";
import {findPath} from "../../services/storage/image.service";


export default function getUserRecipes(username: string): Promise<RecipeCardData[]> {
    return prisma.user.findUnique({where: {username: username}})
        .then(async (user) => {
            if (!user) {
                throw new Error("User not found");
            }

            let userId = user.id;

            return prisma.recipe.findMany({
                where: {
                    author_id: userId
                },
                orderBy: {
                    recipe_rating: {
                        _count: 'desc'
                    }
                }
            }).then(recipes => {
                return recipes.map(recipe => {
                    const data: RecipeCardData = {
                        id: recipe.id,
                        name: recipe.name,
                    }
                    recipe.description && (data.description = recipe.description);

                    // will set only if recipe has image and image is saved at server
                    let path;
                    recipe.image_id && (path = findPath(recipe.image_id)) && (data.image_path = path);
                    return data;
                })
            })
        });
}
