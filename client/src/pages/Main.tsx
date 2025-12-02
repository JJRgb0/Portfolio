import Home from "./Home"
import Projects from "./Projects"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import About from "./About";
import Knowledge from "./Knowledge";
import { mainGSAP } from "../gsap/main";
import Navbar from "../components/Navbar";
import AllSkills from "../components/All-Skills";
import Contact from "./Contact";
import Player from "@vimeo/player";

function Main() {

    const sunRef = useRef<HTMLIFrameElement>(null);
    const sunImgRef = useRef<HTMLImageElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const homeRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const knowledgeRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const [isAllSkills, setIsAllSkills] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);

    useEffect(() => {
        if (!sunRef.current) return;

        const player = new Player(sunRef.current);

        const onPlay = () => {
            setVideoLoaded(true);
        };

        player.on('play', onPlay);

        return () => {
            player.off('play', onPlay);
        };
    }, []);

    useLayoutEffect(() => {
        const gsapInstance = mainGSAP({
            wrapperRef,
            contentRef,
            sunRef: videoLoaded ? sunRef : sunImgRef,
            aboutRef,
            knowledgeRef,
            projectsRef,
            contactRef,
            toZero: videoLoaded ? false : true
        })
        setSmoother(gsapInstance.smoother);
        return gsapInstance.cleanup;
    }, [videoLoaded])

    return (
        <main ref={wrapperRef} className="main">
            <Navbar smoother={smoother} secRefs={{
                home: homeRef,
                about: aboutRef,
                knowledge: knowledgeRef,
                projects: projectsRef,
                contact: contactRef
            }} />
            {!videoLoaded &&
                <img ref={sunImgRef} className="sunStatic" src="/images/sun-image.png" alt="sun-image" />
            }
            <iframe ref={sunRef} title="vimeo-player" src="https://player.vimeo.com/video/1125618685?background=1&autoplay=1&loop=1&muted=1&title=0&badge=0&h=4889f6aad9" width={1080} height={1080} referrerPolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowFullScreen className={videoLoaded ? '' : 'hidden'} />
            <AllSkills isAllSkills={isAllSkills} closeAllSkills={setIsAllSkills} />
            <div ref={contentRef}>
                <Home ref={homeRef} smoother={smoother} />
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