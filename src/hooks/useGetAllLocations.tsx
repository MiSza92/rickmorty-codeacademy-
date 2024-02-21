import { useState, useEffect } from "react";
import { locationData } from "../customTypes.tsx";

export const useGetAllLocations = () => {
  const [locArr, setLocArr] = useState<locationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  let allLocations: locationData[] = [];
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const controller = new AbortController();

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/location?page=1`,
          { signal: controller.signal }
        );
        const data = await response.json();

        allLocations.push(...data.results);
        for (let i = 2; i < data.info.pages + 1; i++) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/location?page=${i}`
          );
          const data = await response.json();

          allLocations.push(...data.results);
        }
      } catch (error) {
        setError(error.message);
      }
      setLocArr(allLocations);
      setLoading(false);
      controller.abort();
    };
    fetchAll();
  }, []);

  return { locArr, loading, error };
};

export default useGetAllLocations;
