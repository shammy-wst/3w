"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaDiscord } from "react-icons/fa";
import Image from "next/image";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const team = [
    {
      name: "Icham M'MADI",
      linkedin: "https://www.linkedin.com/in/aichammmadi/",
      role: "Creative Front-End Developer",
      image: "/images/team/icham.jpeg",
    },
    {
      name: "Samy Hamlat",
      linkedin: "https://www.linkedin.com/in/samy-hamlat-ab9220231/",
      role: "Full Stack Developer",
      image: "/images/team/samy.jpeg",
    },
    {
      name: "Wissem Karboub",
      linkedin: "https://www.linkedin.com/in/wissem-karboub-5b10aa212/",
      role: "Mobile Developer",
      image: "/images/team/wissem.jpeg",
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
            Notre Équipe
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-zinc-900/50 p-6 hover:bg-zinc-800/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg bg-zinc-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority
                      unoptimized
                      onError={(e) => {
                        console.error(`Error loading image: ${member.image}`);
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder.svg";
                      }}
                    />
                  </div>
                  <h2 className="text-2xl font-light mb-2">{member.name}</h2>
                  <p className="text-gray-400 mb-4">{member.role}</p>
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FaLinkedin className="text-xl" />
                    <span>LinkedIn</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="https://discord.gg/WmpGbSBeF6"
              target="_blank"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] transition-colors"
            >
              <FaDiscord className="text-2xl" />
              <span className="text-lg">Rejoignez-nous sur Discord</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
