import Download from "../components/icons/download-icon"
import Github from "../components/icons/github-icon"
import Linkedin from "../components/icons/linkedin-icon"
import { RefObject, useLayoutEffect, useRef } from "react";
import { homeGSAP } from "../gsap/home";

function Home({ ref, smoother }: { ref: RefObject<HTMLElement | null>; smoother: ScrollSmoother | null }) {

    const titlesRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() =>
        homeGSAP({
            titlesRef,
            descriptionRef,
            linksRef,
            homeRef: ref
        })
        , [])

    const contactScroll = () => {
        const el = document.querySelector('.pin-spacer-contact-section');
        smoother?.scrollTo(el, true, "center top");
    }

    return (
        <section ref={ref} className="home" id="home">
            <div ref={titlesRef} className="titles">
                <span className="h2wrapper">
                    <h2>Full Stack Developer</h2>
                </span>
                <h1>Rubens de Melo Galani</h1>
            </div>
            <div ref={descriptionRef} className="description">
                <p>Passionate about learning, my goal is to continue developing increasingly efficient systems, helping more people to achieve positive results.</p>
                <button onClick={contactScroll}>Contact-me</button>
            </div>
            <div ref={linksRef} className="links">
                <a target="_blank"><Download /></a>
                <a href="https://github.com/JJRgb0?tab=repositories" target="_blank"><Github /></a>
                <a href="https://www.linkedin.com/in/rubens-melo-galani-240154288/" target="_blank"><Linkedin /></a>
            </div>
        </section>
    )
}

export default Home