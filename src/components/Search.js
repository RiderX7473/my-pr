import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import "./Search.css";

const SEARCH_ANIME = gql`
  query ($search: String, $page: Int) {
    Page(page: $page, perPage: 80) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          medium
        }
      }
    }
  }
`;

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [searchAnime, { loading, data }] = useLazyQuery(SEARCH_ANIME);

  useEffect(() => {
    if (searchTerm) {
      searchAnime({ variables: { search: searchTerm, page } });
    }
  }, [page, searchTerm, searchAnime]);

  useEffect(() => {
    if (data) {
      setAnimeList(data.Page.media);
    }
  }, [data]);

  const handleSearch = () => {
    setAnimeList([]);
    setPage(1);
    searchAnime({ variables: { search: searchTerm, page: 1 } });
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск аниме..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {loading && <p>Загрузка...</p>}
      <ul className="anime-list">
        {animeList.map((anime) => (
          <li key={anime.id}>
            <Link to={`/anime/${anime.id}`} className="anime-link">
              <img src={anime.coverImage.medium} alt={anime.title.romaji} />
              <span>{anime.title.romaji}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
