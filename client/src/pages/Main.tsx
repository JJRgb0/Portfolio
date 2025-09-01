import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Home from "./Home"
import Projects from "./Projects"
import { useLayoutEffect, useRef } from "react";
import About from "./About";
import Knowledge from "./Knowledge";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Main() {
    const sunRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {

        const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 1.75,
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
                    top: '50%',
                    left: 0,
                    y: '-50%',
                    filter: 'blur(0px)',
                    ease: 'none',

                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top bottom',
                        end: 'top+=75% bottom',
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
                    width: '90%',
                    y: '-50%',
                    x: '-50%',
                    filter: 'blur(0px)',
                    ease: 'none',

                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top bottom',
                        end: 'top+=75% bottom',
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
                    width: '65%',
                    top: '50%',
                    left: 0,
                    y: '-50%',
                    x: '-50%',
                    filter: 'blur(0px)',
                    ease: 'none',

                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top bottom',
                        end: 'top+=75% bottom',
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
        <main ref={wrapperRef} className="main">
            <video ref={sunRef} autoPlay muted playsInline loop>
                <source src="videos/sun.webm" type="video/webm" />
            </video>
            <div ref={contentRef}>
                <Home />
                <About ref={triggerRef} />
                <Knowledge />
                <Projects />
            </div>
        </main>
    )
}

export default Main