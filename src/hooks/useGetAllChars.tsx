import { useState, useEffect } from "react";
import { charData } from "../customTypes";

export const useGetAllChars = () => {
  const [charArr, setCharArr] = useState<charData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  let allCharacters: charData[] = [];
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const controller = new AbortController();

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=1`,
          { signal: controller.signal }
        );
        const data = await response.json();
        getEpisodeNumbersAndPushToCharArr(data, allCharacters);

        for (let i = 2; i < data.info.pages; i++) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${i}`,
            { signal: controller.signal }
          );
          const data = await response.json();
          getEpisodeNumbersAndPushToCharArr(data, allCharacters);
        }
      } catch (error) {
        setError(error.message);
      }

      setCharArr(allCharacters);
      setLoading(false);
      controller.abort();
    };
    fetchAll();
  }, []);

  return { charArr, loading, error };
};
export default useGetAllChars;

function getEpisodeNumbersAndPushToCharArr(data, charArr: charData[]) {
  for (let i = 0; i < data.results.length; i++) {
    let episodesArr: string[] = [];
    for (let j = 0; j < data.results[i].episode.length; j++) {
      let num = data.results[i].episode[j].lastIndexOf("/");
      const episodeNum = data.results[i].episode[j].slice(num + 1);
      episodesArr.push(episodeNum);
    }

    const character: charData = {
      name: data.results[i].name,
      image: data.results[i].image,
      gender: data.results[i].gender,
      location: data.results[i].location.name,
      origin: data.results[i].origin.name,
      species: data.results[i].species,
      episodes: episodesArr as [string],
    };
    charArr.push(character);
  }
  return charArr;
}
