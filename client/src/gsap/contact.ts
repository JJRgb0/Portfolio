import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

function contactGSAP({ ref }: { ref: RefObject<HTMLElement | null> }) {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top top',
                end: 'max',
                scrub: true,
                invalidateOnRefresh: true,
                pin: true,
                pinSpacing: 'margin',
                anticipatePin: 1,
                id: "contact-section",
            }
        })
        tl.fromTo(ref.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 2,
            })
        tl.to({}, { duration: 1 });
    }, ref.current!)

    return () => ctx.revert();
}

export { contactGSAP };