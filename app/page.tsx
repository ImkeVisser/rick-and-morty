import SearchComponent from "./components/SearchComponent";
import { Character } from "./lib/definitions";
import getData from "./services/fetchData";

export default async function Home() {

const characters: Character[] = await getData('https://rickandmortyapi.com/api/character');

   return(
    <main className="m-12">
      <SearchComponent characters={characters} />
    </main>
   )
}
