import React, { useState } from "react";
import { CharacterType } from "@/types/customTypes";
import { GetServerSideProps } from "next";
import styles from "@/styles/characters.module.css";
import colors from "colors";

type fetchData = {
  info: { pages: number };
  results: { character: CharacterType[] };
};
type ComponentProps = {
  characters: CharacterType[];
};

const characterEndPoint = "https://rickandmortyapi.com/api/character/";

const characterPaginationEndPoint = `https://rickandmortyapi.com/api/character/?page=1`;

//! 1. Array erstellen 2.Mach eine Schleife 3. daten ins array 4. id inkrementieren 5.loop

export const getServerSideProps: GetServerSideProps<ComponentProps> = async () => {
  const response = await fetch(characterEndPoint);

  const fetchInfo = (await response.json()) as fetchData;
  //   console.log("fetchInfo :>> ", fetchInfo.info);
  const { results } = fetchInfo;

  let preFinalData = { ...results };
  console.log("preFinalData :>> ", preFinalData);
  for (let i = 1; i <= fetchInfo.info?.pages; i++) {
    const loopFetch = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${i}`
    );
    const fetchInfo = (await loopFetch.json()) as fetchData;
    const { results } = fetchInfo;

    const results2 = results as CharacterType[];
    // console.log("preFinalData :>> ", preFinalData);
    let data: [];
    for (let j = 0; j < results2?.length; j++) {
      //  console.log(`results[${j}] :>> `, results2[j]);
    }
    //  console.log("preFinalData :>> ", preFinalData);
    //console.log("processedInfo :>> ".bgRed, results);
    // preFinalData = [...preFinalData, ...(results as CharacterType[])];
    // const { results } = fetchInfo as CharacterType[];
    //console.log("results :>> ", preFinalData);
    // preFinalData += results;
  }
  //   console.log("data2 :>> ", preFinalData);
  // console.log("preFinalData :>> ", preFinalData);
  const finalData = preFinalData;
  //   console.log("finalData :>> ", finalData);
  return {
    props: { characters: finalData },
  };
};

function characters({ characters }: ComponentProps) {
  console.log("character :>> ", characters[0]);
  let arr1 = [1, 2, 3, 4];
  let arr2 = [5, 6, 7, 8];
  arr1 = [...arr1, ...arr2];

  return (
    <div>
      <ul className={`${styles.characterList}`}>
        {characters &&
          characters.map((result) => {
            const { id, name, image } = result;
            return (
              <li className={`${styles.characterCard}`} key={id}>
                <div className={`${styles.imgBoxOnCard}`}>
                  <img src={image} alt={`Image of ${name}`} />
                </div>
                <div className={`${styles.textBoxOnCard}`}>
                  <ul>
                    <li> {name}</li>
                  </ul>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default characters;
