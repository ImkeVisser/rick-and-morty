import { Suspense } from "react";
import { EpisodeData } from "../lib/definitions";
import { EpisodesQuery } from "../lib/queries";
import { getClient } from "../services/api";

export default async function Page() {
  const { data } = await getClient().query<EpisodeData>({
    query: EpisodesQuery,
    context: {
      fetchOptions: {
        next: { revlidte: 10 },
      },
    },
});

const dimensionEpisodeData  =  data.episodes.results.map(episode => {
  const singleDimensions = episode.characters.reduce((acc: string[], cur) => {
    if (!acc.includes(cur.origin.dimension) && cur.origin.dimension) {
    acc.push(cur.origin.dimension);
    }
    return acc;
}, []);
  return {
    ...episode,
    dimensions: singleDimensions
  }
})
const top10 =  dimensionEpisodeData.slice().sort(function (a, b) { return b.dimensions.length - a.dimensions.length; }).slice(0, 10);

return (
  <main className="my-12 mx-4 xs:mx-6 sm:mx-12">
      <h1 className="text-6xl">Top 10 Episodes:</h1>
      <ol className="grid sm:grid-cols-2 gap-4">
        <Suspense fallback={<p>loading..</p>}>
          {top10.map((episode, index) => {
            return (
              <li key={episode.id} className="p-8 my-12 max-w-xl rounded shadow-xl shadow-green-600">
                <div className="flex items-center">
                  <p className="rounded-full py-2 px-4 w-fit bg-green-600 block">{index +1}</p>
                  <p className="pl-8 text-xl">{episode.episode}: {episode.name}</p>
                </div>
                <ul className="pt-8 flex flex-wrap text-green-600">
                  {episode.dimensions.map(dimension => {
                    return <li key={dimension} className="pr-4">{dimension} - </li>
                  })}
                </ul>
              </li>
            )
          })}
        </Suspense>
      </ol>
  </main>
)
}