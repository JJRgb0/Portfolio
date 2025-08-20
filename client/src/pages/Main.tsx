import Home from "./Home"

function Main() {

    return (
        <main className="main">
            <video autoPlay muted playsInline loop>
                <source src="videos/sun.webm" type="video/webm" />
            </video>
            <Home />
        </main>
    )
}

export default Main