export default function Project({ name, techs, imgSrc, description, link }: { name: string; techs: string[]; imgSrc: string; description: string; link: string }) {
    return (
        <section className={`${name} project`}>
            <div className="techs">
                {
                    techs.map((t, i) => <span key={i}>{t}</span>)
                }
            </div>
            <img src={imgSrc} />
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <a href={link} target="_blank">Acess it!</a>
        </section>
    )
}