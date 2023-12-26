import React from "react";
import "./RecipePreview.css";
import {Link} from "@mui/material";

const RecipePreview = (id, name, description, image) => {
    return (
        <Link className="recipe" key={id} href={'/recipe/' + id }>
            <img src={"http://localhost:3001/" + image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
        </Link>
    )
}

export default RecipePreview;