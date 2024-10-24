import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles.css'

const RecipeCard = ({ recipe }) => (
    <div className="recipe-card">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h2>{recipe.strMeal}</h2>
        <Link to={`/recipe/${recipe.idMeal}`} className='lien'>Consulter la recette</Link>
    </div>
);

export default RecipeCard;
