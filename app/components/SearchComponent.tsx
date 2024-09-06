'use client'

import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react"
import { Character } from "../lib/definitions"
import Card from "./Card";

interface SearchComponentProps {
    characters: Character[]
}

export default function SearchComponent({characters}: SearchComponentProps){
const [seacrhTerm, setSearchTerm] = useState('');
const [searchedCharacters, setSearcCharacters] = useState<Character[] | null>(null)

    useEffect(() => {
        if(seacrhTerm){
            const array = characters.filter(character => character.name.toLowerCase().includes(seacrhTerm.toLowerCase()))
            setSearcCharacters(array)
        }
    },[seacrhTerm])

    const timeoutHandler = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (timeoutHandler.current) {
            clearTimeout(timeoutHandler.current);
        }
        timeoutHandler.current = setTimeout(() => {
            setSearchTerm(event.target.value);
        }, 300);
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
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchedCharacters?.map(character => {
                return <Card key={character.id} {...character} />
            })}
        </ul>
    </>
    )
}