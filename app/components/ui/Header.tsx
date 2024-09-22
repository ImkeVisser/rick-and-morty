import Image from "next/image";

import image from '../../images/rick-and-morty-text.png'

export default function Header(){
    return(
    <header className="flex justify-center py-12">
        <Image src={image} alt="Rick and Morty logo" width={596} height={187}/>
    </header>
    )
}