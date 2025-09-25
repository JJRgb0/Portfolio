import { RefObject, useLayoutEffect, useRef } from "react";
import { aboutGSAP } from "../gsap/about";

function About({ ref }: { ref: RefObject<HTMLElement | null> }) {

    const contentRef = useRef<HTMLDivElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() =>
        aboutGSAP({
            ref,
            imgRef,
            h2Ref,
            pRef,
        })
        , [])

    return (
        <section ref={ref} className="about" id="about">
            <div ref={contentRef}>
                <h2 ref={h2Ref}>Who am I?</h2>
                <p ref={pRef}>For nearly 3 years, I’ve been working as a full stack web developer. With solid expertise in both front-end and back-end, I’ve developed responsive, scalable, and high-performance applications designed to deliver outstanding user experiences.</p>
                <img ref={imgRef} src="images/nebulous.png" />
            </div>
        </section>
    )
}

export default About