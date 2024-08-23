'use client'

import { projects } from '@/constants/model'
import { useState, useEffect } from 'react'
import Scene from '@/components/Scene'
import { Project } from '@/interfaces/model'
import Link from 'next/link'
import Lenis from 'lenis'

export default function List() {
    const [activeProject, setActiveProject] = useState<number | null>(null)

    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return (
        <>
            {/* Project Section */}
            <section
                id="projects"
                className="relative w-full h-screen flex items-center py-2 lg:py-9 z-10 px-4 lg:px-16"
            >
                <Scene
                    activeProject={activeProject}
                    projects={projects ?? []}
                />
                <div
                    onMouseLeave={() => setActiveProject(null)}
                    className="flex flex-col w-full z-0 shrink-0 h-fit px-10 lg:px-20 gap-2"
                >
                    {projects.map((project: Project, index: number) => (
                        <Link
                            href={`${project.githubLink}`}
                            key={project.id}
                            onMouseOver={() => setActiveProject(index)}
                            className="relative w-full flex gap-4 py-6 shrink-0 items-center justify-between border-b border-stone-300"
                        >
                            <span className="text-lg lg:text-2xl font-medium w-4/12 lg:w-2/12 shrink-0 lg:shrink-none">
                                {project.name}
                            </span>
                            <span className="w-fit inline-block text-lg lg:text-2xl font-medium lg:shrink-0">
                                <span className="inline-block lg:hidden">
                                    20
                                </span>
                                <span className="hidden lg:inline-block">
                                    /
                                </span>
                                {project.year}
                            </span>
                        </Link>
                    ))}
                </div>
                {/* End Right Content */}
            </section>
            {/* End Project Section */}
        </>
    )
}
