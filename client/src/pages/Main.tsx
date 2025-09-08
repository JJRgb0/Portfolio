import Home from "./Home"
import Projects from "./Projects"
import { useLayoutEffect, useRef } from "react";
import About from "./About";
import Knowledge from "./Knowledge";
import { mainGSAP } from "../gsap/main";

function Main() {
    const sunRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const knowledgeRef = useRef<HTMLElement>(null);

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
            <video ref={sunRef} autoPlay muted playsInline loop>
                <source src="videos/sun.webm" type="video/webm" />
            </video>
            <div ref={contentRef}>
                <Home />
                <About ref={aboutRef} />
                <Knowledge ref={knowledgeRef} />
                <Projects />
            </div>
        </main>
    )
}

export default Main