import { CharacterDetailsPageParam } from "@/app/lib/definitions";
import Image from "next/image";
import fetchDetails from '../../services/fetchDetails'
import { Suspense } from "react";
import fetchDetailsFromList from "@/app/services/fetchDetailsFromList";

interface CharacterDetailsPageProps {
  params: CharacterDetailsPageParam;
};
 
 export default async function Page(props: CharacterDetailsPageProps) {
  const {id} = props.params;

  const {name, status, species, type, gender, origin, location, image, episode} = await fetchDetails(`https://rickandmortyapi.com/api/character/${id}`)

  const episodes = await fetchDetailsFromList(episode);
  
  return <main className="m-12">
    <Suspense fallback={<p>Loading character details...</p>}>
    <section className="flex flex-col-reverse md:flex-row md:justify-between">
      <div>
        <h1 className="text-3xl md:text-5xl p-2 text-green-600 mb-4">{name}</h1>
        {status && <p className="text-xl text-yellow-600 mb-4">Status: {status}</p>}
        {species && <p className="text-xl text-yellow-600 mb-4">Species: {species}</p>}
        {type && <p className="text-xl text-yellow-600 mb-4">Type: {type}</p>}
        {gender && <p className="text-xl text-yellow-600 mb-4">Gender: {gender}</p>}
        {origin.name && <p className="text-xl text-yellow-600 mb-4">Orgin Location: {origin.name}</p>}
        {location.name && <p className="text-xl text-yellow-600 mb-4">Location: {location.name}</p>}
      </div>
      <Image height={400} width={400} src={image} alt="portrait of character" />
    </section>
    </Suspense>
    <Suspense fallback={<p>Loading episode details...</p>}>
    <p className="text-xl text-red-600 mb-4">Featured episodes: </p>
      <ul>
          {episodes.map(ep => {
            return (
              <li key={ep.id} className="text-lg text-red-600 mb-4">{ep.episode} - {ep.name}</li>
            )
          })}
        </ul>
    </Suspense>
  </main>
}
