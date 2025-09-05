import { RefObject } from "react";

function Knowledge({ ref }: { ref?: RefObject<HTMLElement | null> }) {
    return (
        <section ref={ref} className="knowledge">
            <div className="frontend"></div>
        </section>
    )
}

export default Knowledge;
