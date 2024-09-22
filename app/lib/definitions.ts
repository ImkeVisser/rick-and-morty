export interface CharacterData {
    characters: {
        info: InfoType
        results: Character[]
    }
}

export interface CharacterDetailsData {
    character: CharacterDetails
}
export interface EpisodeData {
    episodes: {
        info: InfoType
        results: Episode[]
    }
}

export interface Character {
    id: string
    image: string
    name: string
    status: 'Alive' | 'Dead' | 'unknown'
}

export interface CharacterDetails extends Character {
    species?: string
    type?: string
    gender: 'Female' |'Male' | 'Genderless' | 'unknown'
    origin: LocationType
    location: LocationType
    episode: EpisodeType[]
}

export interface Episode extends EpisodeType {
    characters: EpisodeCharacter[]
}

type InfoType = {
    count: number
    pages: number
    next: number
    prev:number
}

type EpisodeCharacter = {
    id: string
    name: string
    image: string
    origin: {
        dimension: string
    }
}

type LocationType = {
    name?: string
    dimension?: string
}

type EpisodeType = {
    id: string
    name:string
    episode: string
    air_date:string
}

export type CharacterDetailsPageParam = {
    id: string
}