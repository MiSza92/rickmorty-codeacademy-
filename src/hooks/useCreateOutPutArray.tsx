import { useState, useEffect } from "react";
import { charData, countedData } from "../customTypes";
import useGetAllChars from "./useGetAllChars";
import useGetAllLocations from "./useGetAllLocations";

export const useCreateOutPutArray = (
  speciesValue: string,
  locationValue: string,
  searchValue: string
) => {
  const [outPutArr, setOutPutArr] = useState<charData[]>([]);
  //   const [speciesArr2, setSpeciesArr2] = useState<countedData[]>([]);
  //   const [originArr, setOriginArr] = useState<optionData[]>([]);
  const [speciesArr, setSpeciesArr] = useState<string[]>([]);
  const [originArr, setOriginArr] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    charArr,
    loading: charsLoading,
    error: charsError,
  } = useGetAllChars();

  //! Start Effect

  useEffect(() => {
    setLoading(true);
    createOutPutArr(charArr, speciesValue, locationValue, searchValue);
    setLoading(false);
  }, [charArr, speciesValue, locationValue, searchValue]);

  //! Output

  function createOutPutArr(
    arr: charData[],
    species: string,
    origin: string,
    search: string
  ) {
    setOriginArr(filterArray(arr, "origin"));
    setSpeciesArr(filterArray(arr, "species"));
    if (search !== "") {
      arr = arr.filter(
        (char) =>
          char.name.toLowerCase().startsWith(search.toLowerCase()) ||
          char.name.toLowerCase().includes(" " + search.toLowerCase())
      );
    }

    if (species !== "all") {
      arr = arr.filter((char) => char.species == species);
    }
    if (origin !== "all") {
      arr = arr.filter((char) => char.origin == origin);
    }

    setOutPutArr(arr);
  }

  return { outPutArr, speciesArr, originArr, loading };
};

function filterArray(arr: charData[], value: "species" | "origin") {
  let rawArray: string[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (value == "species") {
      rawArray.push(arr[i].species as string);
    } else if (value == "origin") {
      rawArray.push(arr[i].origin as string);
    }
  }
  let filteredArray: string[] = [];
  filteredArray = rawArray.filter(
    (item, index) => rawArray.indexOf(item) === index
  );

  return filteredArray as string[];
}

// function filterSpecies(arr: charData[]) {
//   let allSpecies: string[] = [];
//   for (let i = 0; i < arr.length; i++) {
//     allSpecies.push(arr[i].species as string);
//   }
//   let filteredSpecies: string[] = [];
//   filteredSpecies = allSpecies.filter(
//     (item, index) => allSpecies.indexOf(item) === index
//   );

//   let speciesWithCount: optionData[] = [];

//   for (let i = 0; i < filteredSpecies.length; i++) {
//     speciesWithCount.push({
//       name: filteredSpecies[i] as string,
//       count: getOccurrence(allSpecies, filteredSpecies[i]),
//     });
//   }

//   return speciesWithCount as optionData[];
// }

export default useCreateOutPutArray;
