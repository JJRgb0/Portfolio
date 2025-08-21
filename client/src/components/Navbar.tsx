import { useState } from "react";
import Hamburger from "./icons/hamburger-icon";

export default function Navbar() {

    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <menu className={`menu ${mobileMenu ? '' : 'off'}`}>
            <Hamburger size={75} toggle={mobileMenu} onClick={() => { setMobileMenu((prev) => !prev) }} className="menu-icon" />
            <nav className={`navbar ${mobileMenu ? '' : 'off'}`}>
                <ul>
                    <li>Home</li>
                    <li>Knowledge</li>
                    <li>Experience</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </menu>
    )
}