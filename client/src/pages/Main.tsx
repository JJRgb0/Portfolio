import Home from "./Home"
import Projects from "./Projects"
import { useLayoutEffect, useRef, useState } from "react";
import About from "./About";
import Knowledge from "./Knowledge";
import { mainGSAP } from "../gsap/main";
import Navbar from "../components/Navbar";
import AllSkills from "../components/All-Skills";

function Main() {

    const sunRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const knowledgeRef = useRef<HTMLElement>(null);

    const [isAllSkills, setIsAllSkills] = useState(false);

    useLayoutEffect(() => {
        return () => {
            mainGSAP({
                wrapperRef,
                contentRef,
                sunRef,
                aboutRef,
                knowledgeRef
            })
        }
    }, [])

    return (
        <main ref={wrapperRef} className="main">
            <Navbar />
            <video ref={sunRef} autoPlay muted playsInline loop>
                <source src="videos/sun.webm" type="video/webm" />
            </video>
            <AllSkills isAllSkills={isAllSkills} closeAllSkills={setIsAllSkills} />
            <div ref={contentRef}>
                <Home />
                <About ref={aboutRef} />
                <Knowledge ref={knowledgeRef} openAllSkills={setIsAllSkills} />
                <Projects />
            </div>
        </main>
    )
}

export default Main