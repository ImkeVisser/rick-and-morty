import { Suspense } from "react";
import { getClient } from "../config/api";
import { EpisodeData } from "../lib/definitions";
import { EpisodesQuery } from "../lib/queries";

export default async function Top10() {

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

    return <section>
      <Suspense fallback={<p>loading..</p>}>
        {top10.map(episode => {
          return (
            <div className="p-4" key={episode.id}>
            <p>{episode.episode}</p>
            <p>{episode.name}</p>
            <p>{episode.air_date}</p>
            <ul>
              {episode.dimensions.map(dimension => {
                return <li key={dimension}>{dimension}</li>
              })}
            </ul>
            </div>
          )
        })}
      </Suspense>
    </section>
}