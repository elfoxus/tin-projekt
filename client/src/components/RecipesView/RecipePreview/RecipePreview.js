import React from "react";
import "./RecipePreview.css";

const RecipePreview = (id, name, description, image) => {
    return (
        <a className="recipe" key={id}>
            <img src={"http://localhost:3001/" + image} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
        </a>
    )
}

export default RecipePreview;