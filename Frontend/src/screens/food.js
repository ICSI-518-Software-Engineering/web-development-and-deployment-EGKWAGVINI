import React, { useState } from 'react';
import axios from 'axios';

function FoodSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const containerStyle = {
    textAlign: 'center'
    
  };

  const inputStyle = {
    width: '50%',
    padding: '10px',
    marginRight: '10px',
    border: '4px solid rgb(224, 224, 224)',
    borderRadius: '10px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const errorStyle = {
    color: 'red'
  };

  const recipeStyle = {
    marginTop: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px'
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://food-recipes-with-images.p.rapidapi.com/', {
        params: { q: query },
        headers: {
          'X-RapidAPI-Key': 'bf7ccd0987msh343f9c0997f1948p18ecc1jsnb27d438c907f',
          'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
        }
      });
      if (response.data && response.data.d) {
        setRecipes(response.data.d);
        setError(null);
      } else {
        setRecipes([]);
        setError('No recipes found');
      }
    } catch (error) {
      setRecipes([]);
      setError('Failed to fetch recipes');
    }
  };

  return (
    <div style={containerStyle}>
      <h1><b>RECIPE SEARCH</b></h1><br></br>
      <h2><i>Search recipes like chicken soup,noodles,pasta..</i></h2><br></br>
      <div>
        <input
          type="text"
          placeholder="Enter recipe which you are looking for"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSearch} style={buttonStyle}>Search</button>
      </div>
      {error && <p style={errorStyle}>{error}</p>}
      {recipes.map((recipe, index) => (
        <div key={index} style={recipeStyle}>
          <h2>{recipe.Title}</h2>
          <h3>Ingredients:</h3>
          <ul>
            {Object.values(recipe.Ingredients).map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.Instructions}</p>
          <img src={recipe.Image} alt={recipe.Title} />
        </div>
      ))}
    </div>
  );
}

export default FoodSearch;
