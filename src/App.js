import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Home from "./pages/Home";
import AnimeDetails from "./components/AnimeDetails";
import Header from "./components/Header";
import Login from "./components/Login";
import Wishlist from "./components/Wishlist";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const addToWishlist = (anime) => {
    if (!wishlist.some((item) => item.id === anime.id)) {
      setWishlist([...wishlist, anime]);
    }
  };

  const removeFromWishlist = (animeId) => {
    setWishlist(wishlist.filter((anime) => anime.id !== animeId));
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header onLoginClick={handleLoginClick} />
        {showLogin && <Login onClose={handleCloseLogin} />}
        <Routes>
          <Route
            path="/"
            element={
              <Home onClose={handleCloseLogin} addToWishlist={addToWishlist} />
            }
          />
          <Route
            path="/anime/:id"
            element={
              <AnimeDetails
                onClose={handleCloseLogin}
                addToWishlist={addToWishlist}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
