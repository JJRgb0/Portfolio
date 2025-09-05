import { RefObject } from "react";
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function mainGSAP({ wrapperRef, contentRef, sunRef, aboutRef, knowledgeRef }: { wrapperRef: RefObject<HTMLElement | null>; contentRef: RefObject<HTMLDivElement | null>; sunRef: RefObject<HTMLVideoElement | null>; aboutRef: RefObject<HTMLElement | null>; knowledgeRef: RefObject<HTMLElement | null> }) {

    const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.75,
        smoothTouch: 1
    })

    const mm = gsap.matchMedia();
    const animations: (gsap.core.Timeline | gsap.core.Tween)[] = [];

    mm.add("(orientation: landscape) and (max-aspect-ratio: 21/9)", () => {
        const firstAnim = gsap.fromTo(sunRef.current,
            {
                width: '55%',
                y: '-50%',
                x: '-50%',
                top: '100%',
                left: '50%',
                filter: 'blur(0.25vw)',
            },
            {
                width: '65%',
                top: '50%',
                left: 0,
                y: '-50%',
                filter: 'blur(0px)',
                ease: 'none',
                overwrite: 'auto',
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: 'top bottom',
                    end: 'top+=75% bottom',
                    scrub: true,
                    invalidateOnRefresh: true,
                    refreshPriority: 2
                }
            })

        animations.push(firstAnim);
        return { firstAnim };
    })

    mm.add("(orientation: portrait)", () => {
        const firstAnim = gsap.fromTo(sunRef.current,
            {
                top: '100%',
                left: '50%',
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
                    trigger: aboutRef.current,
                    start: 'top bottom',
                    end: 'top+=75% bottom',
                    scrub: true,
                }
            })

        animations.push(firstAnim);
        return { firstAnim };
    })

    mm.add("(min-aspect-ratio: 21/9)", () => {
        const firstAnim = gsap.fromTo(sunRef.current,
            {
                height: '125vh',
                left: '100%',
                top: '100%',
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
                    trigger: aboutRef.current,
                    start: 'top bottom',
                    end: 'top+=75% bottom',
                    scrub: true,
                }
            })

        animations.push(firstAnim);
        return { firstAnim };
    })

    const secondAnim = gsap.to(sunRef.current,
        {
            top: '50%',
            y: '-50%',
            width: '15%',
            left: '50%',
            x: '-50%',
            ease: 'none',
            overwrite: 'auto',
            immediateRender: false,
            scrollTrigger: {
                trigger: knowledgeRef.current,
                start: 'top top+=50%',
                end: 'bottom bottom',
                scrub: true,
                invalidateOnRefresh: true,
                refreshPriority: 1
            }
        }
    )

    animations.push(secondAnim)

    return () => {
        animations.forEach(anim => {
            if (anim) anim.kill();
        })

        smoother.kill();
        mm.revert();
    }
}

export { mainGSAP };