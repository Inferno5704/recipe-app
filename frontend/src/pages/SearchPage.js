import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Widget from '../components/Widget';
import backgroundImage from '../assets/background2.png'; // Replace with your background image

const SearchPage = () => {
  const [widgets, setWidgets] = useState([]);
  const [originalWidgets, setOriginalWidgets] = useState([]);

  // Fetch recipes from backend on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/recipes'); // Use proxy in development
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        console.log('Fetched recipes:', data);
        setWidgets(data);
        setOriginalWidgets(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); // Run once on mount

  // Function to filter recipes based on search query
  const filterWidgets = (query) => {
    if (!query.trim()) {
      setWidgets(originalWidgets); // Reset to all recipes when search is cleared
      return;
    }
    const filteredWidgets = originalWidgets.filter((widget) =>
      widget.recipeName.toLowerCase().includes(query.toLowerCase())
    );
    setWidgets(filteredWidgets);
  };

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <div style={styles.background} />

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <SearchBar onSearch={filterWidgets} />
      </div>

      {/* Widgets Section */}
      <div style={styles.widgetsContainer}>
        {widgets.map((widget) => (
          <Widget key={widget._id} dish={widget} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
  },
  background: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '50vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    opacity: 0.8,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '20vh',
  },
  widgetsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    marginTop: '37vh',
  },
};

export default SearchPage;
