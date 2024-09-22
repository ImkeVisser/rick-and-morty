import Image from "next/image";
import { Character } from "../lib/definitions";
import { cn } from "../utils/cn";
import Link from "next/link";

export default function Card (character: Character) {
    const {id, name, image, status} = character

    return <li className="max-w-sm rounded overflow-hidden shadow-xl shadow-green-600">
          <Link href={`/characters/${id}`}>
            <Image height={200} width={200} className="w-full" src={image} alt="portrait of character" />
            <div className="px-6 py-4 flex flex-col">
                <p className="font-bold text-xl mb-2">{name}</p>
                <span className={cn('self-end inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
                    status === 'Alive' && 'bg-green-200',
                    status === 'Dead' && 'bg-red-200',
                    status === 'unknown' && 'bg-yellow-200'
                )}>{status}</span>
            </div>
        </Link>
    </li>
}