import React from "react";
import "@/styles/episodesFullList.module.css";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { CharacterType, episodeType } from "@/types/customTypes";

const GET_EPISODES_DATA = gql`
  query GetEpisodesData {
    characters {
      info {
        count
      }
    }
    episodes {
      info {
        count
      }
      results {
        id
        name
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

function episodesFullList() {
  const { loading, error, data } = useQuery(GET_EPISODES_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const episodes: episodeType[] = data.episodes.results;
  console.log("episodes :>> ", episodes);

  // Überprüfe, ob episodes[0] definiert ist, bevor darauf zugegriffen wird
  if (!episodes || episodes.length === 0 || !episodes[0]) {
    return <p>No episodes data available</p>;
  }

  // Erstelle eine Tabelle mit den Daten
  return (
    <div>
      {episodes.map((episode) => (
        <div key={episode.id}>
          <h3>{episode.name}</h3>
          <ul>
            {episode.characters.map((character) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default episodesFullList;
