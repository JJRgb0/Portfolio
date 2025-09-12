import { RefObject, useLayoutEffect, useRef } from "react"
import Project from "../components/Project"
import { projectsGSAP } from "../gsap/projects"

function Projects({ ref }: { ref: RefObject<HTMLElement | null> }) {

    const c = useRef(0);

    const imgRef = useRef<HTMLImageElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (c.current > 0) return
        c.current = 1;
        return () => {
            projectsGSAP({
                ref,
                imgRef,
                h2Ref,
                contentRef
            })
        }
    }, [])

    return (
        <section ref={ref} className="projects">
            <img ref={imgRef} src="images/galaxy.jpg" />
            <h2 ref={h2Ref}>My works</h2>
            <div ref={contentRef} className="content">
                <Project name="kdLux" techs={['NextJS', 'Prisma', 'TailwindCSS']} description="A jewelry e-commerce" imgSrc="images/kdlux.webp" />
                <Project name="Golden-Ace" techs={['ThreeJS', 'React', 'TailwindCSS']} description="A classic arcade" imgSrc="images/golden-ace.webp" />
                <Project name="Petsart" techs={['Vite', 'TailwindCSS']} description="An art portfolio" imgSrc="images/petsart.webp" />
            </div>
        </section>
    )
}

export default Projects