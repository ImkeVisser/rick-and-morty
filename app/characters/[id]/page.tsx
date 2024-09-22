
import Image from "next/image";
import { Suspense } from "react";
import { CharacterDetailsData, CharacterDetailsPageParam } from "../../lib/definitions";
import { getClient } from "../../services/api";
import { CharacterDetailsQuery } from "../../lib/queries";

interface CharacterDetailsPageProps {
  params: CharacterDetailsPageParam;
};
 
export default async function Page(props: CharacterDetailsPageProps) {
  const {id} = props.params;

    const { data } = await getClient().query<CharacterDetailsData>({
        query: CharacterDetailsQuery,
        variables: {id},
        context: {
          fetchOptions: {
            next: { revlidte: 10 },
          },
        },
    });

  const {image, name, status, species, type, gender, location, origin, episode} = data.character

 return(
  <main className="my-12 mx-4 xs:mx-6 sm:mx-12">
   <Suspense fallback={<p>Loading character details...</p>}>
    <section className="flex flex-col-reverse md:flex-row md:justify-between">
      <div>
        <h1 className="text-3xl md:text-5xl p-2 text-green-600 mb-4">{name}</h1>
        {status && <p className="text-xl text-yellow-600 mb-4">Status: {status}</p>}
        {species && <p className="text-xl text-yellow-600 mb-4">Species: {species}</p>}
        {type && <p className="text-xl text-yellow-600 mb-4">Type: {type}</p>}
        {gender && <p className="text-xl text-yellow-600 mb-4">Gender: {gender}</p>}
        {origin.name && <p className="text-xl text-yellow-600 mb-4">Orgin Location: {origin.name}</p>}
        {origin.dimension && <p className="text-xl text-yellow-600 mb-4">Orgin Dimension: {origin.dimension}</p>}
        {location.name && <p className="text-xl text-yellow-600 mb-4">Last seen Location: {location.name}</p>}
        {location.dimension && <p className="text-xl text-yellow-600 mb-4">Last seen Dimension: {location.dimension}</p>}
      </div>
      <Image height={400} width={400} src={image} alt="portrait of character" />
    </section>
    </Suspense>
    <Suspense fallback={<p>Loading episode details...</p>}>
    <p className="text-xl text-red-600 mb-4">Featured episodes: </p>
      <ul>
          {episode.map(ep => {
            return (
              <li key={ep.id} className="pl-8 text-lg text-red-600 mb-4">{ep.episode} - {ep.name}</li>
            )
          })}
        </ul>
    </Suspense>
  </main>
 )
}