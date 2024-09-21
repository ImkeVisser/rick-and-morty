import { CharactersQuery } from "./lib/queries";
import { getClient } from "./config/api";
import {CharacterData } from "./lib/definitions";
import SearchComponent from "./components/SearchComponent";
import Top10 from "./components/Top10";
import { ApolloWrapper } from "./config/appolo-wrapper";

export default async function Home() {

    const { data } = await getClient().query<CharacterData>({
      query: CharactersQuery,
      variables: { name: "Morty" },
      context: {
        fetchOptions: {
          next: { revlidte: 10 },
        },
      },
    });

   return(
    <main className="m-12">
      <Top10 />
      <ApolloWrapper><SearchComponent characters={data.characters.results} /></ApolloWrapper>
    </main>
   )
}

