export default function Project({ name, techs, imgSrc, description }: { name: string; techs: string[]; imgSrc: string; description: string }) {
    return (
        <section className={`${name} project`}>
            <div className="techs">
                {
                    techs.map((t, i) => <span key={i}>{t}</span>)
                }
            </div>
            <img src={imgSrc} />
            <div className="nad">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div>
                <button>Acess it!</button>
            </div>
        </section>
    )
}