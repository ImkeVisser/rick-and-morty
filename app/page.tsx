import SearchComponent from "./components/SearchComponent";
import Header from "./components/ui/Header";
import { Suspense } from "react";
import getCharacters from "./services/getCharacters";

export default async function Home() {

  const morties = await getCharacters("Morty");
  const characters = await getCharacters();

   return(
    <main className="my-12 mx-4 xs:mx-6 sm:mx-12">
      <Header />
      <Suspense fallback={<p>loading..</p>}>
        <SearchComponent initialCharacters={morties} characters={characters}/>
      </Suspense>
    </main>
   )
}

