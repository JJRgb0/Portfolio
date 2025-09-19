import { useState } from "react";
import Hamburger from "./icons/hamburger-icon";

export default function Navbar({ smoother }: { smoother: ScrollSmoother | null }) {

    const [mobileMenu, setMobileMenu] = useState(false);

    const scrollToSection = (sectionClass: string) => {
        const element = document.querySelector(sectionClass != 'home' ? `.pin-spacer-${sectionClass}-section` : '.home');
        if (element && smoother) {
            smoother.scrollTo(element, true, sectionClass != 'home' ? "center top" : "top top");
        }
        setMobileMenu(false);
    };

    return (
        <menu className={`menu ${mobileMenu ? '' : 'off'}`}>
            <Hamburger size={75} toggle={mobileMenu} onClick={() => { setMobileMenu((prev) => !prev) }} className="menu-icon" />
            <nav className={`navbar ${mobileMenu ? '' : 'off'}`}>
                <ul>
                    <li onClick={() => scrollToSection('home')}>Home</li>
                    <li onClick={() => scrollToSection('about')}>About</li>
                    <li onClick={() => scrollToSection('knowledge')}>Knowledge</li>
                    <li onClick={() => scrollToSection('projects')}>Experience</li>
                    <li onClick={() => scrollToSection('contact')}>Contact</li>
                </ul>
            </nav>
        </menu>
    )
}