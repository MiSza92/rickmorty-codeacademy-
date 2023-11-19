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

export const getServerSideProps: GetServerSideProps<ComponentProps> = async () => {
  let chars = [] as CharacterType[];

  const response = await fetch(characterEndPoint);

  const fetchInfo = (await response.json()) as fetchData;

  for (let i = 0; i <= fetchInfo.info.pages; i++) {
    const loopFetch = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${i}`
    );
    const data = (await loopFetch.json()) as fetchData;
    const data2 = data.results as CharacterType[];
    for (let j = 0; j <= data2.length; j++) {
      if (data2[j] != null) {
        chars.push(data2[j] as CharacterType);
      }
    }
  }
  return {
    props: { characters: chars },
  };
};

function characters({ characters }: ComponentProps) {
  return (
    <div>
      <ul className={`${styles.characterList}`}>
        {characters &&
          characters.map((result: CharacterType) => {
            const { id, name, image, origin } = result;
            return (
              <li className={`${styles.characterCard}`} key={id}>
                <div className={`${styles.imgBoxOnCard}`}>
                  <img src={image} alt={`Image of ${name}`} />
                </div>
                <div className={`${styles.textBoxOnCard}`}>
                  <ul>
                    <li> {name}</li>
                    <li>{origin.name}</li>
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
