import { RefObject, useEffect, useMemo, useState } from "react";
import Hamburger from "./icons/hamburger-icon";

export default function Navbar({ smoother, secRefs }: { smoother: ScrollSmoother | null; secRefs: Record<string, RefObject<HTMLElement | null>> }) {

    const sections = useMemo(() => ['home', 'about', 'knowledge', 'projects', 'contact'], [])

    const [mobileMenu, setMobileMenu] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const elements = [];
        sections.map((sec) => elements.push(document.querySelector(`.${sec}`)));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach((id) => {
            if (secRefs[id].current) {
                observer.observe(secRefs[id].current);
            }
        });

        return () => observer.disconnect();
    }, [sections])

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
                    {
                        sections.map((sec, key) => <li className={activeSection === sec ? 'active' : ''} key={key} onClick={() => scrollToSection(sec)}>{sec}</li>)
                    }
                </ul>
            </nav>
        </menu>
    )
}