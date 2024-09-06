import SearchComponent from "./components/SearchComponent";
import { Character } from "./lib/definitions";
import getData from "./services/fetchData";

export default async function Home() {


const characters: Character[] = await getData('https://rickandmortyapi.com/api/character');

  // let output = characters.reduce((acc: any, cur:any) => {
  //   const { episode } = cur;
  //   episode.map((ep: string) => {
  //       //fetch dimension from cur.origin.url
  //       acc[ep] = acc[ep] ?? [];
  //       acc[ep].push(cur);
  //   })
  //   return acc;
  // }, {});

  // console.log(output);
  //remove duplicates
  //show data

   return(
    <main className="m-12">
      <SearchComponent characters={characters} />
    </main>
   )
}
