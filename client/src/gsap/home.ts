import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

function homeGSAP({ titlesRef, descriptionRef, linksRef, homeRef }: { titlesRef: RefObject<HTMLDivElement | null>; descriptionRef: RefObject<HTMLDivElement | null>; linksRef: RefObject<HTMLDivElement | null>; homeRef: RefObject<HTMLElement | null>; }) {

    const ctx = gsap.context(() => {
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

        gsap.to(titlesRef.current,
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

        gsap.to(descriptionRef.current,
            {
                animation: 'none',
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

        const mm = gsap.matchMedia();

        mm.add("(orientation: landscape) and (max-aspect-ratio: 21/9)", () => {
            gsap.to(linksRef.current,
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
        })

        mm.add("(orientation: portrait), (min-aspect-ratio: 21/9)", () => {
            gsap.to(linksRef.current,
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
        })
    }, homeRef.current!)

    return () => {
        ctx.revert();
    }
}

export { homeGSAP };