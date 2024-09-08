import { GetTop10Episodes } from "../utils/getTop10Dimensions";

export default async function Top10List() {
    const episodes = await GetTop10Episodes()
    return <>
    <h2 className="text-3xl md:text-5xl p-2 text-green-600 mb-4">top 10 list of episodes with the highest count of unique characters&#39; origin dimensions.</h2>
    <ol className="my-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {episodes.map((episode, index)=> <li key={episode.episodeName} className="max-w-sm px-6 py-4 rounded overflow-hidden shadow-lg shadow-green-600">
            <p>#{index +1} {episode.episode}</p>
            <p className="font-bold text-xl mb-2">{episode.episodeName}</p>
            {episode.details.map(detail => <p key={detail.id} className="text-green-600">{detail.character} - {detail.dimension}</p>)}
        </li>)}
    </ol>
    </>
}