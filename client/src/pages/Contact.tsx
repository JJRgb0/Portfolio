import { RefObject, useLayoutEffect, useRef } from "react";
import { contactGSAP } from "../gsap/contact";

export default function Contact({ ref }: { ref: RefObject<HTMLElement | null> }) {

    const c = useRef(0);

    useLayoutEffect(() => {
        if (c.current > 0) return
        c.current = 1;
        return () => {
            contactGSAP({
                ref,
            })
        }
    }, [])

    return (
        <section ref={ref} className="contact">
            <div className="cta">
                <img src="images/headshot.jpeg"></img>
                <div className="header">
                    <h2>Let's work together</h2>
                    <p>I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Turn your ideas into reality!</p>
                </div>
            </div>
            <form>
                <h3>Send me a message and I’ll get back to you as soon as possible.</h3>
                <input placeholder="What's you name?" />
                <input placeholder="What's you email?" />
                <textarea placeholder="Write a message..." />
                <button type="submit">Send message</button>
            </form>
        </section>
    )
}