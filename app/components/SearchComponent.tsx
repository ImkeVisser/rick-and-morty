'use client'

import { ChangeEvent, Suspense, useEffect, useState } from "react"
import { Character } from "../lib/definitions"
import Card from "./Card";
import { useDebounce } from "../hooks/useDebounce";

interface SearchComponentProps {
    characters: Character[]
}

export default function SearchComponent({characters}: SearchComponentProps){
const [seacrhTerm, setSearchTerm] = useState('');
const [searchedCharacters, setSearcCharacters] = useState<Character[] | null>(null)
const debouncedValue = useDebounce(seacrhTerm)

    useEffect(() => {
       if(debouncedValue){
        const array = characters.filter(character => character.name.toLowerCase().includes(debouncedValue.toLowerCase()))
        setSearcCharacters(array)
       }
    },[debouncedValue, characters])

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
        className="w-full bg-transparent autofill:bg-transparent py-2 border-b-2 border-green-600 outline-none focus:border-blue-400" 
        onChange={handleChange}
        />
    </div>
        <Suspense fallback={<p>Loading characters...</p>}>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchedCharacters?.map(character => {
                    return <Card key={character.id} {...character} />
                })}
            </ul>
        </Suspense>
    </>
    )
}