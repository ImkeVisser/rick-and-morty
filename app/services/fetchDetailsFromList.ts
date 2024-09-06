import fetchDetails from "./fetchDetails";

export default async function fetchDetailsFromList(episode: string[]) {
    const results = [];
    for(const ep of episode) {
        const data = await fetchDetails(ep)
        results.push(data)
    }
    return results;
}