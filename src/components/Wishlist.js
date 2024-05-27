import React from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  return (
    <div className="wishlist">
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((anime) => (
          <li key={anime.id}>
            <Link to={`/anime/${anime.id}`}>
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <div>{anime.title.romaji}</div>
            </Link>
            <button onClick={() => removeFromWishlist(anime.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
