"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: "Web Créatif",
      description:
        "On code des sites qui déchirent ! Du design qui en jette, des fonctionnalités innovantes, et une expérience utilisateur au top. Ton projet web mérite ce qu&apos;il y a de mieux.",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
    },
    {
      title: "Apps Next-Gen",
      description:
        "Des apps mobiles qui cartonnent ! On développe des expériences fluides et intuitives qui vont faire kiffer tes utilisateurs, que ce soit sur iOS ou Android.",
      gradient: "from-purple-400 via-purple-500 to-purple-600",
    },
    {
      title: "Design Avant-Gardiste",
      description:
        "On repousse les limites du design digital ! Notre équipe crée des interfaces qui sortent du lot, avec un style unique et une ergonomie parfaite.",
      gradient: "from-pink-400 via-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Banner Section */}
      <section className="flex items-center justify-center h-screen bg-black text-white relative overflow-hidden">
        <div
          className={`transition-all duration-1000 flex flex-col items-center gap-12 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-7xl font-thin relative bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              3W
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl rounded-full animate-pulse"></span>
            </h1>
            <span className="text-2xl font-light tracking-[0.2em] text-gray-400 mt-2">
              SOLUTIONS
            </span>
          </div>

          <Link
            href="/contact"
            className="px-8 py-3 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-300 text-white font-light tracking-wider group relative overflow-hidden"
          >
            <span className="relative z-10">RENCONTREZ L&apos;ÉQUIPE</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm font-light tracking-wider">DÉCOUVRIR</span>
          <FaChevronDown className="animate-bounce" />
        </div>
      </section>

      {/* Services Section */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-zinc-900/50 p-6 hover:bg-zinc-800/50 transition-all duration-300 flex flex-col"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-light mb-4 relative inline-block">
                    {service.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-500"></span>
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link
              href="/projets"
              className="px-8 py-3 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-300 text-white font-light tracking-wider group relative overflow-hidden"
            >
              <span className="relative z-10">DÉCOUVREZ NOS PROJETS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
