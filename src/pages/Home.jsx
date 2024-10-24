import { useEffect, useState } from "react";
import RecipeCard from '../components/RecipeCard';

const Home = () => {
    const [recipes, setRecipes] = useState([]); // État pour les recettes
    const [loading, setLoading] = useState(true); // État pour le chargement
    const [error, setError] = useState(null); // État pour les erreurs

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données");
                }
                return response.json();
            }) 
            .then(data => {
                setRecipes(data.meals);
                setLoading(false); 
            })
            .catch(error => {
                setError(error.message);
                setLoading(false); 
            });
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h1>welcome to your recipes site</h1>
            <div className="recipes-list">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default Home;
