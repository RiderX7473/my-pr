import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./AnimeList.css";

const GET_ANIME_LIST = gql`
  query ($page: Int) {
    Page(page: $page, perPage: 80) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

const AnimeList = () => {
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [getAnimeList, { loading, data }] = useLazyQuery(GET_ANIME_LIST);

  useEffect(() => {
    getAnimeList({ variables: { page } });
  }, [page, getAnimeList]);

  useEffect(() => {
    if (data) {
      setAnimeList(data.Page.media);
    }
  }, [data]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div>
      <ul className="anime-grid">
        {animeList.map((anime) => (
          <li key={anime.id}>
            <Link to={`/anime/${anime.id}`}>
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <div>{anime.title.romaji}</div>
            </Link>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
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

export default AnimeList;
