import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recipe.css';

const Recipe = ({ id }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipe/${id}`);
                setRecipe(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="recipe-container" style={{ backgroundImage: `url(${recipe.image})` }}>
            <div className="recipe-content">
                <div className="recipe-header">
                    <h1>{recipe.recipeName}</h1>
                    <img src={recipe.image} alt={recipe.name} className="recipe-image"/>
                </div>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h2>Instructions</h2>
                {recipe.instructions.map((instruction, index) => (
                    <p key={index}>{instruction}</p>
                ))}
            </div>
        </div>
    );
};

export default Recipe;
