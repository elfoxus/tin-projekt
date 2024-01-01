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

export interface RecipeAddRequest {
    name: string,
    description: string,
    servings: number,
    time: string,
    ingredients: string[],
    steps: AddRecipeRequestStep[],
    dishes: string[],
    categories: string[],
    tags: string[]
}

export interface AddRecipeRequestStep {
    number: number,
    name: string
}

export interface AddRecipeData {
    username: string
    name: string,
    description: string,
    servings: number,
    cook_time: Date,
    ingredients: string[],
    steps: AddRecipeRequestStep[],
    dishes: string[],
    categories: string[],
    tags: string[],
    image: Express.Multer.File
}