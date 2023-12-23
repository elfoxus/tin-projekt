import React, {useEffect, useState} from 'react';
import './RecipesView.css';
import axios from "axios";
import RecipePreview from './RecipePreview/RecipePreview'
import Section from "../Section/Section";

const RecipesView = ({url, title = ""}) => {

        const [recipes, setRecipes] = useState([]);

        useEffect(() => {
            axios.get(url)
                .then(response => {
                    setRecipes(response.data)
                })
                .catch(error => console.log(error));
        }, []);

        return (
            <Section title={title}>
                <div className="recipes">
                    {recipes.map(item => {
                        return RecipePreview(item.id, item.name, item.description, item.image_path);
                    })}
                </div>
            </Section>
        )
}

export default RecipesView;