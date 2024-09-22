
import Image from "next/image";
import { Suspense } from "react";
import { CharacterDetailsData, CharacterDetailsPageParam } from "../../lib/definitions";
import { getClient } from "../../services/api";
import { CHARACTER_DETAILS_QUERY} from "../../lib/queries";

interface CharacterDetailsPageProps {
  params: CharacterDetailsPageParam;
};
 
export default async function Page(props: CharacterDetailsPageProps) {
  const {id} = props.params;

    const { data } = await getClient().query<CharacterDetailsData>({
        query: CHARACTER_DETAILS_QUERY,
        variables: {id},
        context: {
          fetchOptions: {
            next: { revlidte: 10 },
          },
        },
    });

  const {image, name, status, species,type, gender, location, origin, episode} = data.character

 return(
  <main className="grid md:grid-cols-2 gap-6">
    <div className="mx-4 xs:mx-6 sm:mx-12 md:ml-12 mt-12 lg:max-w-lg rounded shadow-xl shadow-green-600">
      <Image height={200} width={200} className="w-full h-[300px] rounded-tl rounded-tr object-cover object-top" src={image} alt="portrait of character" />
      <div className="px-6 py-4 flex flex-col">
        <p className="mb-2"><span className="font-bold">name: </span>{name}</p>
        {species && <p className="mb-2"><span className="font-bold">species: </span>{species}</p>}
        {type && <p className="mb-2"><span className="font-bold">type: </span>{type}</p>}
        <p className="font-bold mb-2"><span className="font-bold">gender: </span>{gender}</p>
        {origin.name && <p className="mb-2"><span className="font-bold">location: </span>{origin.name}</p>}
        {origin.dimension && <p className="mb-2"><span className="font-bold">dimension: </span>{origin.dimension}</p>}
      </div>
    </div>
    <div className="mx-auto my-auto max-w-lg">
      <h1 className="text-4xl mb-2">{name}</h1>
      {status === "Alive" || status === "Dead" && <p className="mb-2">{name} is {status.toLowerCase()}</p>}
      {location.name && location.dimension && <p className="mb-2">{name} was last seen in {location.name && location.name !== "unknown" && `${location.name} located in` } {location.dimension && location.dimension !== "unknown" ? location.dimension : 'a unknown'} dimension</p>}
      <p className="mb-2">{name} is seen in episodes: </p>
      <ul className="list-disc pl-6">
        {episode.map(episode => {
          return (
            <li key={episode.id} className="mb-2">{episode.episode}: {episode.name} at {episode.air_date}</li>
          )
        })}
      </ul>
    </div>
  </main>
 )
}