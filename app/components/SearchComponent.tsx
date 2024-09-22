'use client'

import { Suspense, useEffect, useState } from "react"
import Card from "./Card";
import { useDebounce } from "../hooks/useDebounce";
import { Character } from "../lib/definitions";
import SearchBar from "./ui/Search";

interface SearchComponentProps {
    initialCharacters: Character[]
    characters: Character[]
}

export default function SearchComponent({initialCharacters, characters}: SearchComponentProps){
    const [seacrhTerm, setSearchTerm] = useState('');
    const [searchedCharacters, setSearcCharacters] = useState<Character[]>(initialCharacters)
    const debouncedValue = useDebounce(seacrhTerm)
  
    useEffect(() => {
       if(debouncedValue){
        const characterList = characters.filter(character => character.name.toLowerCase().includes(debouncedValue.toLowerCase()))
        setSearcCharacters(characterList)
       }
    },[debouncedValue, characters])

    return (
    <>
        <SearchBar 
            label={'search your favourite character'}
            onChange={value => setSearchTerm(value)}/>
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