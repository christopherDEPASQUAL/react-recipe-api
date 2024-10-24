import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles.css'

const Recipe = () => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                setRecipe(data.meals[0]);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Chargement des recettes...</p>;
    if (error) return <p>Erreur : {error}</p>;
    if (!recipe) return <p>Aucune recette trouvée</p>;

    return (
        <div className='recipe-detail'>
            <h1>{recipe.strMeal}</h1>
            <div className='card-img'>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>

            <div className="card-steps">
                <h2>Steps to follow to cook this dish</h2>
                <p>{recipe.strInstructions}</p>
            </div>
            
            <h2>Ingredients</h2>
            <ul>
                {Object.keys(recipe)
                    .filter(key => key.startsWith('strIngredient') && recipe[key])
                    .map((ingredientKey, index) => (
                        <li key={index}>{recipe[ingredientKey]}</li>
                    ))}
            </ul>
        </div>
    );
};

export default Recipe;
