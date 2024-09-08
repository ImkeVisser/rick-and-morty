export type Character = {
    id: string
    name: string
    status: 'Alive' | 'Dead' | 'unknown'
    species?: string
    type?: string
    gender: 'Female' |'Male' | 'Genderless' | 'unknown'
    origin: LocationType
    location: LocationType
    image: string
    episode: string[]
    url:string
    created: string
}

type LocationType = {
    name: string
    url:string
}

export type LocationData = {
    id:string
    character: string
    dimension: string
}

export type CharacterDetailsPageParam = {
    id: string
}