import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

function knowledgeGSAP({ ref, h2Ref, frontendRef, backendRef, devopsRef }: { ref: RefObject<HTMLElement | null>; h2Ref: RefObject<HTMLDivElement | null>; frontendRef: RefObject<HTMLDivElement | null>; backendRef: RefObject<HTMLDivElement | null>; devopsRef: RefObject<HTMLDivElement | null>; }) {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "+=1000px",
                pin: true,
                pinSpacing: "margin",
                scrub: 1,
                anticipatePin: 1
            }
        })

        tl.fromTo(
            h2Ref.current,
            {
                opacity: 0,
                x: "-100%"
            },
            {
                x: 0,
                opacity: 1,
                duration: 2
            }
        )

        tl.fromTo(
            devopsRef.current,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 2
            }
        )

        tl.fromTo(
            backendRef.current,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 2
            }
        )

        tl.fromTo(
            frontendRef.current,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 2
            }
        )

        tl.to({}, { duration: 3 })

        tl.fromTo(
            frontendRef.current,
            {
                opacity: 1
            },
            {
                opacity: 0,
                duration: 1.5
            }
        )

        tl.fromTo(
            backendRef.current,
            {
                opacity: 1
            },
            {
                opacity: 0,
                duration: 1.5
            },
            "<"
        )

        tl.fromTo(
            devopsRef.current,
            {
                opacity: 1
            },
            {
                opacity: 0,
                duration: 1.5
            },
            "<"
        )

        tl.fromTo(
            h2Ref.current,
            {
                opacity: 1,
                x: 0
            },
            {
                x: "-100%",
                opacity: 0,
                duration: 2
            },
            "<"
        )

    }, ref.current!)

    return () => ctx.revert();
}

export { knowledgeGSAP };