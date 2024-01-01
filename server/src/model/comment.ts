export interface CommentWithRating {
    id: number,
    recipe_id: number,
    user: {
        id: number,
        username: string
    },
    date: Date,
    comment: string
    rating: number
}