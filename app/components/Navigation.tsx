import Image from "next/image";
import Link from "next/link";
import image from "../images/rick-and-morty.png"

export default function Navigation(){
    return(
    <nav className="px-4 xs:px-6 sm:px-12 py-2 rounded flex justify-between items-center sticky top-0 shadow-lg z-10 bg-darkgreen bg-opacity-85 shadow-green-600">
        <Link href={'/'}>
            <Image src={image} alt="Rick and Morty" width={64} height={64} />
        </Link>
        <ul className="flex gap-4 xs:gap-8 sm:gap-16 font-bold">
            <Link href={'/'}>Characters</Link>
            <Link href={'/episodes'}>Episodes</Link>
        </ul>
    </nav>
    )
}