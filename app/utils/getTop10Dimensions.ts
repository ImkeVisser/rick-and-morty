import { Character, LocationData } from "../lib/definitions";
import getData from "../services/fetchData";
import fetchDetails from "../services/fetchDetails";

export async function GetCharactersCategorizedByEpisode() {
    const characters: Character[] = await getData('https://rickandmortyapi.com/api/character');

    return characters.reduce((acc, cur:Character) => {
        const { episode } = cur;
        episode.map((ep: string) => {
            acc[ep] = acc[ep] ?? [];
            acc[ep].push(cur);
        })
        return acc;
    }, {} as Record<string, Character[]>);
}

export async function getLocationData(episodes: Character[]){
    const locationData: LocationData[] = []

    for(const episode of episodes) {
        if(episode.origin.url){
        const data = await fetchDetails(episode.origin.url);
        const {dimension, id} = data
          locationData.push({character: episode.name, dimension, id})
        }
    } 
    return locationData
}
export function removeDuplicateDimensions(locationData:LocationData[]){
    const singleDimensions = locationData.reduce((acc: string[], cur) => {
        if (!acc.includes(cur.dimension)) {
        acc.push(cur.dimension);
        }
        return acc;
    }, []);

    return singleDimensions
}

export async function GetTop10Episodes() {
    const episodeList = await GetCharactersCategorizedByEpisode();
    const newList = []

    for (const [key, value] of Object.entries(episodeList)) {
    const episodeData = await fetchDetails(key)
    const {episode, name} = episodeData

    const locationData = await getLocationData(value)
    
    const singleDimensions = removeDuplicateDimensions(locationData)

    const list = {episode: episode, episodeName:name, dimensions: singleDimensions, details: [...locationData]}
    newList.push(list)
    }
    const top10 = newList.slice().sort(function (a, b) { return b.dimensions.length - a.dimensions.length; }).slice(0, 10);
    return top10
}