import { useEffect, useState } from "react";
import { charData } from "../customTypes";

export const useGetCharByID = (id: number) => {
  const [char, setChar] = useState<charData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();

        setChar(data as charData);
      } catch (error) {
        setError(error?.message);
      }
      setLoading(false);
    };
    fetchCharacters();
  }, []);

  return { char, loading, error };
};
export default useGetCharByID;
