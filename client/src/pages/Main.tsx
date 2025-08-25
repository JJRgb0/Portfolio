import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from "./Home"
import Projects from "./Projects"
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Main() {
    const sunRef = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {

        const mm = gsap.matchMedia();

        mm.add("(orientation: landscape) and (max-aspect-ratio: 21/9)", () => {
            return gsap.fromTo(sunRef.current,
                {
                    scale: 1.3,
                    y: '-65%',
                    x: '0%',
                    rotation: 0,
                    filter: 'blur(0.25vw)',
                },
                {
                    scale: 1,
                    y: '-155%',
                    x: '-45%',
                    rotation: 180,
                    filter: 'blur(0px)',
                    ease: 'none',

                    scrollTrigger: {
                        trigger: ".projects",
                        start: 'top bottom',
                        end: 'top+=30% bottom',
                        scrub: true,
                    }
                })
        })

        mm.add("(orientation: portrait)", () => {
            return gsap.fromTo(sunRef.current,
                {
                    scale: 2,
                    y: '-75%',
                    x: '0%',
                    rotation: 0,
                    filter: 'blur(0.25vw)',
                },
                {
                    scale: 1,
                    y: '-163%',
                    x: '-77%',
                    rotation: 180,
                    filter: 'blur(0px)',
                    ease: 'none',

                    scrollTrigger: {
                        trigger: ".projects",
                        start: 'top bottom',
                        end: 'top+=30% bottom',
                        scrub: true,
                    }
                })
        })

        mm.add("(min-aspect-ratio: 21/9)", () => {
            return gsap.fromTo(sunRef.current,
                {
                    scale: 2,
                    y: '-65%',
                    x: '0%',
                    rotation: 0,
                    filter: 'blur(0.2vw)',
                },
                {
                    scale: 1,
                    y: '-165%',
                    x: '-83%',
                    rotation: 180,
                    filter: 'blur(0px)',
                    ease: 'none',

                    scrollTrigger: {
                        trigger: ".projects",
                        start: 'top bottom',
                        end: 'top+=30% bottom',
                        scrub: true,
                    }
                })
        })

        return () => {
            mm.revert();
        }
    }, [])

    return (
        <main className="main">
            <video ref={sunRef} autoPlay muted playsInline loop>
                <source src="videos/sun.webm" type="video/webm" />
            </video>
            <Home />
            <Projects />
        </main>
    )
}

export default Main