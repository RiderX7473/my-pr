import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import "./AnimeDetails.css";

const GET_ANIME_DETAILS = gql`
  query ($id: Int!) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
      }
      description
      trailer {
        id
        site
      }
      coverImage {
        large
      }
    }
  }
`;

const AnimeDetails = ({ addToWishlist }) => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { title, description, trailer, coverImage } = data.Media;

  const handleAddToWishlist = () => {
    addToWishlist({
      id: data.Media.id,
      title: data.Media.title,
      coverImage: data.Media.coverImage,
    });
  };

  return (
    <div className="container">
      <img src={coverImage.large} alt={title.romaji} className="cover-image" />
      <h1 className="title">{title.romaji}</h1>
      <p
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
      {trailer && trailer.site === "youtube" && (
        <div className="trailer">
          <iframe
            src={`https://www.youtube.com/embed/${trailer.id}`}
            title="Anime Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <button onClick={handleAddToWishlist}>Add to Wishlist</button>
    </div>
  );
};

export default AnimeDetails;
