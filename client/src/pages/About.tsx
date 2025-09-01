import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function About({ ref }: { ref?: RefObject<HTMLElement | null> }) {

    const contentRef = useRef<HTMLDivElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref!.current,
                start: "top top",
                end: "+=425vh",
                pin: true,
                pinSpacing: true,
                scrub: 1,
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

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        }
    }, [])

    return (
        <section ref={ref} className="about">
            <div ref={contentRef}>
                <h2 ref={h2Ref}>Who am I?</h2>
            </div>
            <p ref={pRef}>For nearly 3 years, I’ve been working as a full stack web developer. With solid expertise in both front-end and back-end, I’ve developed responsive, scalable, and high-performance applications designed to deliver outstanding user experiences.</p>
            <img ref={imgRef} src="images/nebulous.png" />
        </section>
    )
}

export default About