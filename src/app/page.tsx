"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showWhyUs, setShowWhyUs] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateActiveSection = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionHeight = htmlSection.clientHeight;

        if (
          scrollPosition >= sectionTop - windowHeight / 2 &&
          scrollPosition < sectionTop + sectionHeight - windowHeight / 2
        ) {
          setActiveSection(htmlSection.id);
        }
      });
    };

    setIsVisible(true);
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection);
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  const toggleSection = () => {
    setShowWhyUs(!showWhyUs);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      title: "Web Créatif",
      description:
        "On code des sites qui déchirent ! Du design qui en jette, des fonctionnalités innovantes, et une expérience utilisateur au top. Ton projet web mérite ce qu&apos;il y a de mieux.",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      image: "/images/web.svg",
    },
    {
      title: "Apps Next-Gen",
      description:
        "Des apps mobiles qui cartonnent ! On développe des expériences fluides et intuitives qui vont faire kiffer tes utilisateurs, que ce soit sur iOS ou Android.",
      gradient: "from-purple-400 via-purple-500 to-purple-600",
      image: "/images/mobile.svg",
    },
    {
      title: "Design Avant-Gardiste",
      description:
        "On repousse les limites du design digital ! Notre équipe crée des interfaces qui sortent du lot, avec un style unique et une ergonomie parfaite.",
      gradient: "from-pink-400 via-pink-500 to-pink-600",
      image: "/images/design.svg",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      <motion.div
        className="fixed inset-0 z-0 transition-colors duration-1000"
        animate={{
          backgroundColor:
            activeSection === "services" ? "rgb(17, 24, 39)" : "rgb(0, 0, 0)",
        }}
      />

      {/* Banner Section */}
      <section
        id="banner"
        className="flex items-center justify-center h-[90vh] relative overflow-hidden"
      >
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

        <button
          onClick={() => scrollToSection("services")}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="text-sm font-light tracking-wider">DÉCOUVRIR</span>
          <FaChevronDown className="animate-bounce" />
        </button>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className={`relative flex flex-col items-center justify-center min-h-[90vh] p-8 transition-all duration-1000 z-10 ${
          activeSection === "services" ? "scale-100" : "scale-95"
        }`}
      >
        <div className="max-w-[90vw] w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-thin text-center mb-24 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Nos Services
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative overflow-hidden bg-zinc-900/50 p-16 hover:bg-zinc-800/50 transition-all duration-500 flex flex-col transform hover:scale-105"
                style={{
                  minHeight: "600px",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-12 w-24 h-24 relative opacity-60 group-hover:opacity-100 transition-opacity">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain filter invert"
                    />
                  </div>
                  <h2 className="text-4xl font-light mb-8 relative inline-block">
                    {service.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-700"></span>
                  </h2>
                  <p className="text-xl font-light text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <Link
              href="/contact"
              className="px-8 py-3 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all duration-300 text-white font-light tracking-wider group relative overflow-hidden flex items-center gap-3"
            >
              <span className="relative z-10">CONTACTEZ-NOUS</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Séparateur vertical */}
      <div className="relative w-full h-32 flex items-center justify-center">
        <div className="relative h-full flex flex-col items-center">
          {/* Ligne pointillée */}
          <div className="h-full w-[2px] border-l-2 border-dashed border-gray-800"></div>

          {/* Cercle avec flèche cliquable */}
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-0 transform translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
          >
            <div className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center bg-transparent backdrop-blur-sm">
              <FaChevronDown className="text-gray-400 text-xl animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* Qui Sommes-Nous Section */}
      <section id="about" className="relative w-full h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <motion.div
              className="absolute inset-0 flex"
              animate={{ x: showWhyUs ? "-100%" : "0%" }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              {/* Qui Sommes-Nous Content */}
              <div className="w-full h-full flex-none">
                <div className="h-full flex items-center px-16">
                  <div className="max-w-7xl mx-auto w-full">
                    <motion.h2
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-6xl font-thin mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                      Qui Sommes-Nous
                    </motion.h2>
                    <div className="prose prose-invert max-w-none">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <p className="text-2xl font-light text-gray-300 leading-relaxed">
                          Née de la passion et de l&apos;ambition de trois
                          jeunes développeurs talentueux, 3W Solutions
                          représente l&apos;alliance parfaite entre créativité
                          débordante et expertise technique. Après
                          l&apos;obtention de leurs diplômes, Samy, Icham et
                          Wissem ont décidé de repousser les limites du possible
                          dans le monde du développement web et mobile.
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12"
                      >
                        <div className="grid grid-cols-3 gap-8 mb-12">
                          <div className="text-center">
                            <div className="text-5xl font-light text-blue-400 mb-4">
                              15+
                            </div>
                            <div className="text-gray-400">
                              Projets Innovants
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-5xl font-light text-purple-400 mb-4">
                              98%
                            </div>
                            <div className="text-gray-400">
                              Satisfaction Client
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-5xl font-light text-pink-400 mb-4">
                              10k+
                            </div>
                            <div className="text-gray-400">Heures de Code</div>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        <p className="text-2xl font-light text-gray-300 leading-relaxed">
                          Avec une moyenne d&apos;âge de 24 ans, nous apportons
                          un regard neuf et des solutions innovantes à chaque
                          défi. Notre mission ? Transformer vos idées en
                          réalités numériques exceptionnelles.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Séparateur avec bouton */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              animate={{
                x: showWhyUs ? "-100vw" : "0",
                opacity: showWhyUs ? 0 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={toggleSection}
                className="w-32 flex flex-col items-center justify-center gap-4 py-8 border-x border-gray-800 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors text-gray-400 hover:text-white"
              >
                <span className="text-lg font-light tracking-wider text-center px-4">
                  T&apos;en veux plus ?
                </span>
                <FaChevronRight className="text-3xl animate-pulse" />
              </button>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex"
              animate={{ x: showWhyUs ? "0%" : "100%" }}
              transition={{ type: "tween", duration: 0.5 }}
            >
              {/* Pourquoi Nous Content */}
              <div className="w-full h-full flex-none relative">
                <button
                  onClick={toggleSection}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-32 flex flex-col items-center justify-center gap-4 py-8 border-x border-gray-800 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors text-gray-400 hover:text-white"
                >
                  <span className="text-lg font-light tracking-wider text-center px-4">
                    Retour
                  </span>
                  <FaChevronRight className="text-3xl animate-pulse rotate-180" />
                </button>
                <div className="h-full flex items-center px-16">
                  <div className="max-w-7xl mx-auto w-full">
                    <motion.h2
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-6xl font-thin mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                      Pourquoi Nous
                    </motion.h2>
                    <div className="prose prose-invert max-w-none">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                      >
                        <p className="text-2xl font-light text-gray-300 leading-relaxed">
                          Rejoindre 3W Solutions, c&apos;est faire partie
                          d&apos;une aventure unique où chaque jour apporte son
                          lot de défis passionnants. Notre équipe jeune et
                          dynamique cultive un environnement où
                          l&apos;innovation et la créativité sont au cœur de
                          chaque projet.
                        </p>
                        <div className="grid grid-cols-2 gap-12 my-16">
                          <div className="space-y-4">
                            <h3 className="text-3xl font-light text-blue-400">
                              Pour Nos Clients
                            </h3>
                            <ul className="space-y-4 text-xl text-gray-300">
                              <li>• Solutions sur mesure et innovantes</li>
                              <li>• Accompagnement personnalisé</li>
                              <li>• Excellence technique garantie</li>
                              <li>• Résultats mesurables et concrets</li>
                            </ul>
                          </div>
                          <div className="space-y-4">
                            <h3 className="text-3xl font-light text-purple-400">
                              Pour Nos Talents
                            </h3>
                            <ul className="space-y-4 text-xl text-gray-300">
                              <li>• Projets stimulants et variés</li>
                              <li>• Formation continue</li>
                              <li>• Environnement de travail flexible</li>
                              <li>• Évolution de carrière rapide</li>
                            </ul>
                          </div>
                        </div>
                        <p className="text-2xl font-light text-gray-300 leading-relaxed">
                          Que vous soyez un client à la recherche
                          d&apos;excellence ou un talent passionné par le
                          développement, 3W Solutions vous offre
                          l&apos;opportunité de concrétiser vos ambitions dans
                          un cadre stimulant et innovant.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
