import Download from "../components/icons/download-icon"
import Github from "../components/icons/github-icon"
import Linkedin from "../components/icons/linkedin-icon"

function Home() {

    return (
        <section className="home">
            <div className="titles">
                <h2>Full Stack Developer</h2>
                <h1>Rubens de Melo Galani</h1>
            </div>
            <div className="description">
                <p>Passionate about learning, my goal is to continue developing increasingly efficient systems, helping more people to achieve positive results.</p>
                <button>Contact-me</button>
            </div>
            <div className="links">
                <Download />
                <Github />
                <Linkedin />
            </div>
        </section>
    )
}

export default Home