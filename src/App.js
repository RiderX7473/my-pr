import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<Anime />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
