import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Home from "./Home"
import Projects from "./Projects"
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Main() {
    const sunRef = useRef<HTMLVideoElement>(null);

    useLayoutEffect(() => {

        const smoother = ScrollSmoother.create({
            wrapper: ".main",
            content: ".content",
            smooth: 2,
            smoothTouch: 1
        })

        const mm = gsap.matchMedia();

        mm.add("(orientation: landscape) and (max-aspect-ratio: 21/9)", () => {
            return gsap.fromTo(sunRef.current,
                {
                    y: '-50%',
                    x: '-50%',
                    filter: 'blur(0.25vw)',
                },
                {
                    width: '65%',
                    top: 0,
                    left: 0,
                    y: '-60%',
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
                    width: '80%',
                    y: '-70%',
                    x: '-5%',
                    filter: 'blur(0.25vw)',
                },
                {
                    width: '60%',
                    top: 0,
                    left: 0,
                    y: '-55%',
                    x: '-40%',
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
                    y: '-65%',
                    x: '-65%',
                    filter: 'blur(0.2vw)',
                },
                {
                    width: '40%',
                    top: 0,
                    left: 0,
                    y: '-60%',
                    x: '-40%',
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
            smoother.kill();
            mm.revert();
        }
    }, [])

    return (
        <main className="main">
            <video ref={sunRef} autoPlay muted playsInline loop>
                <source src="videos/sun.webm" type="video/webm" />
            </video>
            <div className="content">
                <Home />
                <Projects />
            </div>
        </main>
    )
}

export default Main