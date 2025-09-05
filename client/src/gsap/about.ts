import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

function aboutGSAP({ ref, imgRef, h2Ref, pRef }: { ref: RefObject<HTMLElement | null>; imgRef: RefObject<HTMLImageElement | null>; h2Ref: RefObject<HTMLHeadingElement | null>; pRef: RefObject<HTMLParagraphElement | null>; }) {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "+=500px",
                pin: true,
                pinSpacing: "margin",
                scrub: 1,
                anticipatePin: 1
            }
        });

        tl.fromTo(imgRef.current, { opacity: 0 }, { opacity: .6, duration: 2 });
        tl.fromTo(h2Ref.current, { x: '100%', opacity: 0 }, { x: '0', opacity: 1, duration: 2 });
        tl.fromTo(pRef.current, { x: '100%', opacity: 0 }, { x: '0', opacity: 1, duration: 2 }, "-=0.5");

        tl.to({}, { duration: 3 });

        tl.fromTo(h2Ref.current, { opacity: 1 }, { opacity: 0, duration: 2 });
        tl.fromTo(pRef.current, { opacity: 1 }, { opacity: 0, duration: 2 }, "-=0.5");
        tl.fromTo(imgRef.current, { opacity: .6 }, { opacity: 0, duration: 2 });

        tl.to({}, { duration: 0.5 });
    }, ref.current!)

    return () => ctx.revert();
}

export { aboutGSAP };