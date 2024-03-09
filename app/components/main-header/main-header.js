
import Link from "next/link";

import Image from "next/image";

import logoImg from "@/assets/logo.png"
import styles from "./main-header.module.css"
import MainHeaderBackground from "./main-header-background";
import NavLinks from "../nav/nav-link";

export default function MainHeader(){
    return(
    <>
        <MainHeaderBackground/>
       <header className={styles.header}>
        <Link href="/" className={styles.logo}>
            <Image src= {logoImg} alt="A Plate with food on it" priority/>
            NextLevel Food
        </Link>
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLinks href="/meals">Brows Meals</NavLinks>
                </li>
                <li>
                    <NavLinks href="/community">Foodie Community</NavLinks>
                </li>
            </ul>
        </nav>
       </header>
    </>
    );
}