import { gql } from "@apollo/client";

export const CHARACTERS_QUERY = gql(`
    query CharacterList($name: String, $page: Int) {
       characters(page: $page, filter: { name: $name }) {
        info {
            count
            pages
            next
            prev
        }
        results {
            id
            image
            name
            status
        }
    }
    }
  `)

export const CHARACTER_DETAILS_QUERY = gql(`
    query CharacterDetails($id: ID!) {
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

export const EPISODE_QUERY = gql(`
    query EpisodeList($page: Int) {
        episodes(page: $page) {
            info {
            count
            pages
            next
            prev
            }
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