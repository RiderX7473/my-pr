// WishlistPage.js
import React from "react";
import Wishlist from "../components/Wishlist"; // Импорт компонента Wishlist

const WishlistPage = ({ onClose }) => {
  const handleItemClick = (animeId) => {
    // Логика для перехода к деталям аниме, например, с помощью react-router-dom
    console.log(`Clicked on anime with ID ${animeId}`);
  };

  return (
    <div>
      <h1>Wishlist</h1>
      <Wishlist onItemClick={handleItemClick} />{" "}
      {/* Передача обработчика для клика на элементе */}
      <button onClick={onClose}>Close Wishlist</button>{" "}
      {/* Кнопка для закрытия страницы Wishlist */}
    </div>
  );
};

export default WishlistPage;
