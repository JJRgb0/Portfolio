import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

function projectsGSAP({ ref, imgRef, h2Ref, contentRef }: { ref: RefObject<HTMLElement | null>; imgRef: RefObject<HTMLImageElement | null>; h2Ref: RefObject<HTMLHeadingElement | null>; contentRef: RefObject<HTMLDivElement | null> }) {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "=+1000px",
                pin: true,
                pinSpacing: "margin",
                scrub: 1,
                anticipatePin: 1
            }
        })

        tl.fromTo(imgRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 1,
            })

        tl.fromTo(h2Ref.current,
            {
                opacity: 0,
                x: '-100%'
            },
            {
                opacity: 1,
                x: 0,
                duration: 1.5
            },
            "<"
        )

        tl.fromTo(contentRef.current,
            {
                x: '100%',
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.5
            }
        )

        tl.to({}, { duration: 3 });

        tl.fromTo(imgRef.current,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                duration: 1,
            })

        tl.fromTo(h2Ref.current,
            {
                opacity: 1,
                x: 0
            },
            {
                opacity: 0,
                x: '-100%',
                duration: 1.5
            },
            "<"
        )

        tl.fromTo(contentRef.current,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                duration: 1.5
            }
        )
    }, ref.current!)

    return () => ctx.revert();
}

export { projectsGSAP };