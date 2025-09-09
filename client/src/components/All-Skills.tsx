import { Dispatch, SetStateAction } from "react";

const hardSkills = [
    "Html",
    "CSS",
    "Javascript",
    "Typescript",
    "React.js",
    "Next.js",
    "Vite",
    "Tailwind CSS",
    "Sass",
    "GSAP",
    "Three.js",
    "Redux",
    "Node.js",
    "Npm",
    "Express.js",
    "Prisma",
    "SQL",
    "MySQL",
    "SQLite",
    "Docker",
    "Docker compose",
    "AWS",
    "Github Actions",
    "Git",
    "GitHub",
    "Vercel",
    "Linux basics",
    "Insomnia",
    "Python",
    "C",
    "C#",
    "GraphQL",
    "Unity",
    "Nginx",
    "Jira",
    "VS Code",
    "Blender"

];

export default function AllSkills({ isAllSkills, closeAllSkills }: { isAllSkills: boolean; closeAllSkills: Dispatch<SetStateAction<boolean>> }) {

    return (
        <aside className={`all-skills ${isAllSkills ? 'on' : ''}`}>
            <svg onClick={() => closeAllSkills(false)} xmlns="http://www.w3.org/2000/svg" fill="#f2e7d5" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
            </svg>
            <div className="content">
                <h2>
                    My stack
                </h2>
                <ul>
                    {
                        hardSkills.map((sk, i) => <li key={i}>{sk}</li>)
                    }
                </ul>
            </div>
        </aside>
    )
}