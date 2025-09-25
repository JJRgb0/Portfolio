import { ChangeEvent, FormEvent, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { contactGSAP } from "../gsap/contact";

export default function Contact({ ref }: { ref: RefObject<HTMLElement | null> }) {

    const [contactInfo, setContactInfo] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [status, setStatus] = useState({
        message: "",
        error: false
    });
    const firstLoad = useRef(true);
    const statusRef = useRef<HTMLSpanElement | null>(null);

    useLayoutEffect(() =>
        contactGSAP({
            ref,
        })
        , [])

    useEffect(() => {
        if (firstLoad.current) {
            (statusRef.current as HTMLSpanElement).style.opacity = '0';
            firstLoad.current = false;
            return;
        }
        if (status.error == true) {
            (statusRef.current as HTMLSpanElement).style.backgroundColor = '#c73c3e';
        }
        else {
            (statusRef.current as HTMLSpanElement).style.backgroundColor = '#259c4d';
        }
        (statusRef.current as HTMLSpanElement).style.opacity = '1';
        setTimeout(() => {
            (statusRef.current as HTMLSpanElement).style.opacity = '0';
        }, 5000)
    }, [status]);

    const updateForm = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setContactInfo({
            ...contactInfo,
            [name]: value,
        });
    }

    async function sendEmail(e: FormEvent) {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const isInDevelopment = import.meta.env.DEV;
        const url = isInDevelopment ? 'http://localhost:3000/mail' : 'https://rubens-dmg.vercel.app/mail';
        try {
            const res: Response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'https://rubens-dmg.vercel.app',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactInfo)
            })
            const message = (await res.json()).message;
            if (!res.ok) {
                return setStatus({ message: message == status ? `${message}.` : message, error: true });
            }
            setContactInfo({
                name: "",
                email: "",
                message: ""
            });
            return setStatus({ message: message == status ? `${message}.` : message, error: false });
        } catch (err) {
            setStatus({ message: err == status ? `${err as string}.` : err as string, error: true })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section ref={ref} className="contact" id="contact">
            <div className="cta">
                <img src="images/headshot.jpeg"></img>
                <div className="header">
                    <h2>Let's work together</h2>
                    <p>I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Turn your ideas into reality!</p>
                </div>
            </div>
            <form onSubmit={sendEmail}>
                <h3>Send me a message and I’ll get back to you as soon as possible.</h3>
                <input disabled={isSubmitting} placeholder="What's you name?" name="name" value={contactInfo.name} onChange={(e) => updateForm(e)} />
                <input disabled={isSubmitting} placeholder="What's you email?" name="email" value={contactInfo.email} onChange={(e) => updateForm(e)} />
                <textarea disabled={isSubmitting} placeholder="Write a message..." name="message" value={contactInfo.message} onChange={(e) => updateForm(e)} />
                <button type="submit" disabled={isSubmitting}>Send message</button>
            </form>
            <span ref={statusRef} className="status">{status.message}</span>
        </section>
    )
}