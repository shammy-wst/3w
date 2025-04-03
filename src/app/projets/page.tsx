"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFigma, FaFolder, FaFolderOpen, FaTools } from "react-icons/fa";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      title: "BORED",
      description:
        "Application web interactive et ludique avec une expérience utilisateur unique.",
      technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
      type: "Web App",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      link: "https://bored-app-inky.vercel.app/",
      inDevelopment: false,
    },
    {
      title: "FlixHive",
      description:
        "Plateforme de streaming moderne avec une interface utilisateur fluide et intuitive.",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      type: "Web App",
      gradient: "from-purple-400 via-purple-500 to-purple-600",
      link: "https://flix-hive-web.vercel.app/",
      inDevelopment: false,
    },
    {
      title: "TaskHUB",
      description:
        "Application de gestion de tâches avec synchronisation multi-base de données.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "PostgreSQL",
        "MongoDB",
      ],
      type: "Web App",
      gradient: "from-pink-400 via-pink-500 to-pink-600",
      link: "https://task-hub-taupe.vercel.app/",
      inDevelopment: false,
    },
    {
      title: "Showroombaby",
      description:
        "Application mobile e-commerce pour articles de puériculture (en développement).",
      technologies: ["Flutter/React Native"],
      type: "Mobile App",
      gradient: "from-green-400 via-green-500 to-green-600",
      link: "https://www.showroombaby.com/#/",
      inDevelopment: true,
    },
    {
      title: "Templiers d'Élancourt",
      description:
        "Site officiel du club de football américain (en développement).",
      technologies: ["Next.js", "TypeScript", "Laravel"],
      type: "Web App",
      gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
      link: "#",
      inDevelopment: true,
    },
  ];

  const designs = [
    {
      name: "MEESHY",
      link: "https://www.figma.com/design/gerdMPgQVcfUwGvKZ0Sf5z/MEESHY---DESIGN?node-id=0-1&t=Ip8l7lGQmB40GEgz-1",
    },
    {
      name: "Design System",
      link: "https://www.figma.com/proto/N4tblSjJgZACpyzwDcyNMU?node-id=0-1&t=8m7zfXzfAAyDvgTC-6",
    },
    {
      name: "BlackRock",
      link: "https://www.figma.com/design/e7dNSGt9bMuCuSjRKXfTc0/BlackRock?m=auto&t=8m7zfXzfAAyDvgTC-1",
    },
    {
      name: "Monnaie de Paris x Hermé",
      link: "https://www.figma.com/design/A14zl274lj2DN6hY4ngbXK/Monnaie-de-Paris-x-Herm%C3%A9?m=auto&t=8m7zfXzfAAyDvgTC-1",
    },
    {
      name: "Showroombaby",
      link: "https://www.figma.com/slides/v8sBJSoWQVZZGmHrFbvR0K/Showroombaby-pr%C3%A9sentation?t=8m7zfXzfAAyDvgTC-6",
    },
    {
      name: "Re-Design AFPA",
      link: "https://www.figma.com/design/J1axQeZKYqSnyJ7cRxiB5X/Re-Design-AFPA?m=auto&t=8m7zfXzfAAyDvgTC-6",
    },
    {
      name: "Design System 2",
      link: "https://www.figma.com/proto/yzHLMuxvWCUkezcoHxBdwS?node-id=0-1&t=8m7zfXzfAAyDvgTC-6",
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div
          className={`transition-all duration-1000 max-w-6xl w-full ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl font-thin text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nos Réalisations
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project, index) => (
              <Link
                href={project.link}
                target="_blank"
                key={index}
                className="group relative overflow-hidden bg-zinc-900/50 p-6 hover:bg-zinc-800/50 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-800">
                      {project.type}
                    </span>
                    {project.inDevelopment && (
                      <div className="flex items-center gap-2 text-yellow-400">
                        <FaTools className="animate-pulse" />
                        <span className="text-sm">En développement</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-light mb-3">{project.title}</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-black/30 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div
            className="relative overflow-hidden bg-zinc-900/50 p-6 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer"
            onClick={() => setIsDesignOpen(!isDesignOpen)}
          >
            <div className="flex items-center gap-4 mb-4">
              {isDesignOpen ? (
                <FaFolderOpen className="text-4xl text-yellow-400" />
              ) : (
                <FaFolder className="text-4xl text-yellow-400" />
              )}
              <h2 className="text-2xl font-light">Designs Figma</h2>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500 ${
                isDesignOpen
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {designs.map((design, index) => (
                <Link
                  key={index}
                  href={design.link}
                  target="_blank"
                  className="group flex items-center gap-2 p-3 bg-black/30 hover:bg-black/50 transition-all duration-300"
                >
                  <FaFigma className="text-xl text-pink-400" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {design.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
