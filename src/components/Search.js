import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Search.css";

const SEARCH_ANIME = gql`
  query ($search: String, $page: Int) {
    Page(page: $page, perPage: 80) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
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

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      <ul className="anime-grid">
        {animeList.map((anime) => (
          <li key={anime.id}>
            <Link to={`/anime/${anime.id}`}>{anime.title.romaji}</Link>
          </li>
        ))}
      </ul>
      {data && (
        <ReactPaginate
          pageCount={data.Page.pageInfo.lastPage}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      )}
    </div>
  );
};

export default Search;
