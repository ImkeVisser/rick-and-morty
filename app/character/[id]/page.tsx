
import Image from "next/image";
import { Suspense } from "react";
import { CharacterDetailsData, CharacterDetailsPageParam } from "../../lib/definitions";
import { getClient } from "../../config/api";
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

  const {image, name, species} = data.character

 return(
  <main>
    <Suspense fallback={<p>loading..</p>}>
    <Image height={400} width={400} src={image} alt="portrait of character" />
    {name} {species}
    </Suspense>
  </main>
 )
}