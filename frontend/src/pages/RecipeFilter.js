import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Recipe.css';

const RecipeFilterPage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    // Use environment variable or fallback to localhost
    const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/recipe/${id}`);
                setRecipe(response.data);
            } catch (err) {
                console.error('Error fetching the recipe:', err);
            }
        };

        fetchRecipe();
    }, [id, backendURL]);

    if (!recipe) return <div>Loading...</div>;

    const imageUrl = `${backendURL}/uploads/${recipe.image}`;
    console.log(imageUrl);
    return (
        <div className="recipe-container" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="recipe-content">
                <div className="recipe-header">
                    <h1>{recipe.recipeName}</h1>
                    <img src={imageUrl} alt={recipe.recipeName} className="recipe-image" />
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

export default RecipeFilterPage;
