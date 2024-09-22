import { getClient } from "./api";
import { Character, CharacterData, Episode, EpisodeData } from "../lib/definitions";
import { CHARACTERS_QUERY, EPISODE_QUERY } from "../lib/queries";

export function getAllCharacters(name?:string, page:number = 1, allData: Character[] = []): Promise<Character[]> {
    return new  Promise((resolve, reject) => getClient().query<CharacterData>({
        query: CHARACTERS_QUERY,
        variables: {page, name},
        context: {
          fetchOptions: {
            next: { revlidte: 10 },
          },
        },
      }).then(data => {
        allData = [...allData, ...data.data.characters.results]
        if(data.data.characters.info.next) {
            getAllCharacters(name, data.data.characters.info.next, allData).then(resolve).catch(reject)
        } else {
          resolve(allData);
        }
      }));
  }

  export function getAllEpisodes(page: number = 1, allData: Episode[] = []): Promise<Episode[]> {
    return new  Promise((resolve, reject) => getClient().query<EpisodeData>({
        query: EPISODE_QUERY,
        variables: {page},
        context: {
          fetchOptions: {
            next: { revlidte: 10 },
          },
        },
      }).then(data => {
        allData = [...allData, ...data.data.episodes.results]
        if(data.data.episodes.info.next) {
            getAllEpisodes(data.data.episodes.info.next, allData).then(resolve).catch(reject)
        } else {
          resolve(allData);
        }
      }));
  }