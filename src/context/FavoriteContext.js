import React, { createContext, useState, useContext } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
    setFavorites((prev) => [...prev, item]);
  };

  const removeFromFavorites = (item) => {
    setFavorites((prev) => prev.filter(fav => fav.title !== item.title));
  };

  const isFavorite = (item) => {
    return favorites.some(fav => fav.title === item.title);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
