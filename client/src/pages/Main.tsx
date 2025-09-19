import Home from "./Home"
import Projects from "./Projects"
import { useLayoutEffect, useRef, useState } from "react";
import About from "./About";
import Knowledge from "./Knowledge";
import { mainGSAP } from "../gsap/main";
import Navbar from "../components/Navbar";
import AllSkills from "../components/All-Skills";
import Contact from "./Contact";

function Main() {

    const sunRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const knowledgeRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const [isAllSkills, setIsAllSkills] = useState(false);

    const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

    useLayoutEffect(() => {
        const gsapInstance = mainGSAP({
            wrapperRef,
            contentRef,
            sunRef,
            aboutRef,
            knowledgeRef,
            projectsRef,
            contactRef
        })
        setSmoother(gsapInstance.smoother);
        return gsapInstance.cleanup;
    }, [])

    return (
        <main ref={wrapperRef} className="main">
            <Navbar smoother={smoother} />
            <video ref={sunRef} autoPlay muted playsInline loop>
                <source src="videos/sun.webm" type="video/webm" />
            </video>
            <AllSkills isAllSkills={isAllSkills} closeAllSkills={setIsAllSkills} />
            <div ref={contentRef}>
                <Home />
                <About ref={aboutRef} />
                <Knowledge ref={knowledgeRef} openAllSkills={setIsAllSkills} />
                <Projects ref={projectsRef} />
                <Contact ref={contactRef} />
                <div style={{ height: '1px' }}></div>
            </div>
        </main>
    )
}

export default Main