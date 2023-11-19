export interface CharacterType {
  id: number;
  name: string;
  image: string;
  origin: { name: string };
}
export type episodeType = {
  id: string;
  name: string;
  characters: { id: string; name: string; image: string }[];
};
