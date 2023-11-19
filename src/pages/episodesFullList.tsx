import React from "react";
import styles from "@/styles/episodesFullList.module.css";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { CharacterType, episodeType } from "@/types/customTypes";

const GET_EPISODES_DATA = gql`
  query GetEpisodesData {
    characters {
      info {
        count
      }
      results {
        name
        image
      }
    }
    episodes {
      info {
        count
      }
      results {
        id
        name
      }
    }
  }
`;

function episodesFullList() {
  const { loading, error, data } = useQuery(GET_EPISODES_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const episodes: episodeType[] = data.episodes.results;
  const characters = data.characters.results;
  console.log("data :>> ", data);
  console.log("episodes :>> ", episodes);

  // Überprüfe, ob episodes[0] definiert ist, bevor darauf zugegriffen wird
  if (!episodes || episodes.length === 0 || !episodes[0]) {
    return <p>No episodes data available</p>;
  }

  // Erstelle eine Tabelle mit den Daten
  return (
    <div className={`${styles.tableContainer}`}>
      <table className={`${styles.bigTable}`}>
        <thead className={`${styles.tableHead}`}>
          <tr>
            <th id="leerCell"></th>
            {episodes.map((episode) => (
              <th key={episode.id}>
                {episode.id} - {episode.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`${styles.tableBody}`}>
          {characters.map((character) => (
            <tr key={character.name}>
              <td colSpan={episodes.length + 1}>{character.name}</td>
              {episodes.map((episode) => (
                <td key={episode.id}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default episodesFullList;
{
  /* {episodes.map((episode) => (
        <div key={episode.id}>
          <h3>
            {episode.id}
            {episode.name}
          </h3>
          <ul>
            {episode.characters.map((character) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </div>
      ))} */
}
