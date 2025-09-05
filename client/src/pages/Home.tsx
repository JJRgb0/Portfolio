import Download from "../components/icons/download-icon"
import Github from "../components/icons/github-icon"
import Linkedin from "../components/icons/linkedin-icon"
import { useLayoutEffect, useRef } from "react";
import { homeGSAP } from "../gsap/home";

function Home() {

    const titlesRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const homeRef = useRef<HTMLElement>(null);

    useLayoutEffect(() =>
        homeGSAP({
            titlesRef,
            descriptionRef,
            linksRef,
            homeRef
        })
        , [])

    return (
        <section ref={homeRef} className="home">
            <div ref={titlesRef} className="titles">
                <span className="h2wrapper">
                    <h2>Full Stack Developer</h2>
                </span>
                <h1>Rubens de Melo Galani</h1>
            </div>
            <div ref={descriptionRef} className="description">
                <p>Passionate about learning, my goal is to continue developing increasingly efficient systems, helping more people to achieve positive results.</p>
                <button>Contact-me</button>
            </div>
            <div ref={linksRef} className="links">
                <Download />
                <Github />
                <Linkedin />
            </div>
        </section>
    )
}

export default Home