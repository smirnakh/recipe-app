import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Spinner from './components/Spinner';
import { BiSearchAlt } from '@react-icons/all-files/bi/BiSearchAlt';
import { GiFoodChain } from '@react-icons/all-files/gi/GiFoodChain';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [spinnerOn, setSpinnerOn] = useState(false);

  const APP_ID = '28c3c60b';
  const APP_KEY = '27856e0e0e117f6a16d338c4ec1d3619';
  const URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getRecipes = () => {
    setSpinnerOn(true);

    axios
      .get(URL)
      .then((res) => {
        setRecipes(res.data.hits);
        console.log(res.data.hits);
        setSpinnerOn(false);
      })
      .catch((err) => console.log(err.message));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };
  useEffect(() => {
    document.title = 'MY RECIPES.yum';
  }, []);

  return (
    <div className="App">
      <div className="content">
        <div className="form-container">
          <h1>
            <GiFoodChain className="shark" />
            <span>MY</span> RECIPES<span>.yum</span>
          </h1>
          <form className="search-form" onSubmit={onSubmit}>
            <input
              className="search-bar"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Ingredient"
            />
            <BiSearchAlt
              className="search-btn"
              onClick={getRecipes}
            ></BiSearchAlt>
          </form>
        </div>
        <Spinner on={spinnerOn} />

        <div className="cards">
          {recipes.map((recipe, index) => {
            return (
              <Card
                recipe={recipe}
                key={index}
                ingredients={recipe.recipe.ingredients}
                onClick={() => {}}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
