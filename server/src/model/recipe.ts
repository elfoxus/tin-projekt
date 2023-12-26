export interface RecipeCardData {
    id: number,
    name: string,
    description?: string,
    image_path?: string
}

export interface RecipeDetails extends RecipeCardData {
    cook_time: Date,
    servings: number,
    author?: {
        id: number,
        name: string
    }
    rating: number,
    ingredients: string[]
    steps: {
        number: number,
        description: string
    }[]
    dishes: string[]
    categories: string[]
    tags: string[]
}
