import { getClient } from "./api";
import { Character, CharacterData } from "../lib/definitions";
import { CharactersQuery } from "../lib/queries";

export default function getCharacters(name?:string, page:number = 1, allData: Character[] = []): Promise<Character[]> {
    return new  Promise((resolve, reject) => getClient().query<CharacterData>({
        query: CharactersQuery,
        variables: {page, name},
        context: {
          fetchOptions: {
            next: { revlidte: 10 },
          },
        },
      }).then(data => {
        allData = [...allData, ...data.data.characters.results]
        if(data.data.characters.info.next) {
            getCharacters(name, data.data.characters.info.next, allData).then(resolve).catch(reject)
        } else {
          resolve(allData);
        }
      }));
  }