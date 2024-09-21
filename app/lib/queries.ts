import { gql } from "@apollo/client";

export const CharactersQuery = gql(`
    query CharacterList($name: String) {
       characters(filter: { name: $name }) {
            results {
                id
                image
                name
                status
            }
        }
    }
  `)

export const CharacterDetailsQuery = gql(`
    query characterDetails($id: ID!) {
        character(id: $id){
            id
            image
            name
            status
            species
            type
            gender
            origin {
            id
            name
            dimension
            }
            location {
            id
            name
            dimension
            }
            episode {
            id
            name
            episode
            air_date
            }
        }
    }
    `)

export const EpisodesQuery = gql(`
    query {
        episodes {
            results {
            id
            name
            air_date
            episode
            characters {
                id
                name
                image
                status
                    origin {
                        dimension
                    }
                }
            }
        }
    }
  `);