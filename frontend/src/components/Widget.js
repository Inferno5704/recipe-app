import React from 'react';

const Widget = ({ dish }) => {
  console.log('Dish:', dish); // Ensure dish object is received correctly
  const imageUrl = `http://localhost:4000/uploads/${dish.image}`; // Construct the full URL for the image
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '200px' }}>
      <img src={imageUrl} alt={dish.recipeName} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <h3>{dish.recipeName}</h3>
      <p>{dish.description}</p>
    </div>
  );
};

export default Widget;
