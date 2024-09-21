'use client'

import { ChangeEvent, Suspense, useEffect, useState } from "react"
import Card from "./Card";
import { useDebounce } from "../hooks/useDebounce";
import { CharactersQuery } from "../lib/queries";
import { OperationVariables, useSuspenseQuery } from "@apollo/client";
import { Character, CharacterData } from "../lib/definitions";

interface SearchComponentProps {
    characters: Character[]
}

export default function SearchComponent({characters}: SearchComponentProps){
    const [seacrhTerm, setSearchTerm] = useState('');
    const [searchedCharacters, setSearcCharacters] = useState<Character[]>(characters)
    const debouncedValue = useDebounce(seacrhTerm)
    const {data } = useSuspenseQuery<CharacterData, OperationVariables>(CharactersQuery);
    
    useEffect(() => {
       if(debouncedValue){
        const characterList = data.characters.results.filter(character => character.name.toLowerCase().includes(debouncedValue.toLowerCase()))
        setSearcCharacters(characterList)
       }
    },[debouncedValue])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
       setSearchTerm(event.target.value)
    };

    return (
    <>
        <div className="mb-12 flex flex-col items-center">
            <label className="text-lg mb-4" htmlFor="search">Search your favorite character</label>
            <input 
            type="text" 
            id="search" 
            placeholder="Search..."
            className="w-full bg-transparent autofill:!bg-transparent py-2 border-b-2 border-green-600 outline-none focus:border-blue-400" 
            onChange={handleChange}
            />
        </div>
        <Suspense fallback={<p>loading characters...</p>}>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchedCharacters?.map(character => {
                    return <Card key={character.id} {...character} />
                })}
            </ul>
        </Suspense>
    </>
    )
}