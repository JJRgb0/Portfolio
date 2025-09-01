import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Download from "../components/icons/download-icon"
import Github from "../components/icons/github-icon"
import Linkedin from "../components/icons/linkedin-icon"
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Home() {

    const titlesRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const homeRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const animations: gsap.core.Tween[] = [];

        gsap.set(titlesRef.current, {
            opacity: 1,
            x: '-50%',
            y: 0,
            scale: 1
        });

        gsap.set(descriptionRef.current, {
            opacity: 1,
            x: 0,
            y: 0
        });

        gsap.set(linksRef.current, {
            opacity: 1,
            x: 0
        });

        const titlesAnimation = gsap.to(titlesRef.current,
            {
                opacity: 0,
                y: -20,
                scale: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: homeRef.current,
                    start: "top top",
                    end: "bottom 25%",
                    scrub: 1,
                    toggleActions: "play none none reverse",
                    onRefresh: () => {
                        if (window.scrollY === 0) {
                            gsap.set(titlesRef.current, {
                                opacity: 1,
                                x: '-50%',
                                y: 0,
                                scale: 1
                            });
                        }
                    }
                }
            });
        animations.push(titlesAnimation);

        const descriptionAnimation = gsap.to(descriptionRef.current,
            {
                opacity: 0,
                x: -100,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: homeRef.current,
                    start: "top top",
                    end: "bottom 50%",
                    scrub: 1.5,
                    toggleActions: "play none none reverse",
                    onRefresh: () => {
                        if (window.scrollY === 0) {
                            gsap.set(descriptionRef.current, {
                                opacity: 1,
                                x: 0,
                                y: 0
                            });
                        }
                    }
                }
            });
        animations.push(descriptionAnimation);

        const mm = gsap.matchMedia();

        mm.add("(orientation: landscape) and (max-aspect-ratio: 21/9)", () => {
            const linksAnimation = gsap.to(linksRef.current,
                {
                    opacity: 0,
                    x: 100,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: homeRef.current,
                        start: "top top",
                        end: "bottom 50%",
                        scrub: 2,
                        toggleActions: "play none none reverse",
                        onRefresh: () => {
                            if (window.scrollY === 0) {
                                gsap.set(linksRef.current, { opacity: 1, x: 0 });
                            }
                        }
                    }
                });
            animations.push(linksAnimation);
        })

        mm.add("(orientation: portrait), (min-aspect-ratio: 21/9)", () => {
            const linksAnimation = gsap.to(linksRef.current,
                {
                    opacity: 0,
                    x: -100,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: homeRef.current,
                        start: "top top",
                        end: "bottom 50%",
                        scrub: 2,
                        toggleActions: "play none none reverse",
                        onRefresh: () => {
                            if (window.scrollY === 0) {
                                gsap.set(linksRef.current, { opacity: 1, x: 0 });
                            }
                        }
                    }
                });
            animations.push(linksAnimation);
        })

        return () => {
            animations.forEach(animation => {
                if (animation) animation.kill();
            });
            ScrollTrigger.getAll().forEach(st => st.kill());
            mm.revert();
        }
    }, [])

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