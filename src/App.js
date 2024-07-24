import React from 'react';
import Recipe from './Recipe';

const App = () => {
    const recipeId = '6671cb417e2c9e83fd2952ec'; // Replace with a valid ID from your MongoDB

    return (
        <div>
            <Recipe id={recipeId} />
        </div>
    );
};

export default App;
