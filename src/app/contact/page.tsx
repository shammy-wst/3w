"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import {
  FaLinkedin,
  FaDiscord,
  FaEnvelope,
  FaPaperPlane,
  FaSpinner,
  FaExternalLinkAlt,
  FaShieldAlt,
} from "react-icons/fa";
import Image from "next/image";

// Simple CAPTCHA
interface Captcha {
  question: string;
  answer: string;
}

const generateCaptcha = (): Captcha => {
  // Générer deux nombres aléatoires entre 1 et 10
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  return {
    question: `Combien font ${num1} + ${num2} ?`,
    answer: String(num1 + num2),
  };
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    captcha: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<Captcha>({ question: "", answer: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    // Générer un nouveau CAPTCHA
    setCaptcha(generateCaptcha());

    return () => clearTimeout(timer);
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setFormData((prev) => ({ ...prev, captcha: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation de tous les champs
      const errors: Record<string, string> = {};
      Object.entries(formData).forEach(([name, value]) => {
        const error = validateField(name, value);
        if (error) errors[name] = error;
      });

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setIsSubmitting(false);
        return;
      }

      // Vérification du CAPTCHA
      if (formData.captcha !== captcha.answer) {
        setFormStatus("error");
        setErrorMessage(
          "La réponse au CAPTCHA est incorrecte. Veuillez réessayer."
        );
        refreshCaptcha();
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      // Réinitialisation du formulaire
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        captcha: "",
      });
      setFormStatus("success");
      setFieldErrors({});
      refreshCaptcha();

      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi de l'email"
      );
      refreshCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction de validation des champs
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? "Veuillez entrer une adresse email valide"
          : "";
      default:
        return !value ? "Ce champ est requis" : "";
    }
  };

  // Validation à la perte de focus
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => {
      // Si le champ est valide, supprime l'erreur
      const error = validateField(name, value);
      const newErrors = { ...prev };

      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }

      return newErrors;
    });
  };

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
      <div className="flex-1 flex flex-col items-center justify-center p-8 pt-24 md:pt-20">
        <div
          className={`transition-all duration-500 max-w-6xl w-full ${
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
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={(e) => {
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

          {/* Formulaire de contact */}
          <div className="mt-24 mb-16">
            <h2 className="text-4xl font-thin text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Contactez-Nous
            </h2>

            <div className="max-w-2xl mx-auto bg-zinc-900/50 p-8 rounded-lg">
              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                    <FaPaperPlane className="text-3xl text-green-400" />
                  </div>
                  <h3 className="text-2xl font-light mb-4">Message envoyé !</h3>
                  <p className="text-gray-400 mb-6">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>

                  {/* Afficher l'URL de prévisualisation Ethereal en mode développement */}
                  {previewUrl && (
                    <div className="mb-6 p-4 bg-blue-900/30 rounded-lg">
                      <p className="text-sm text-blue-300 mb-2">
                        Mode test: L&apos;email n&apos;a pas été envoyé
                        réellement. Vous pouvez voir une prévisualisation ici:
                      </p>
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                      >
                        <FaExternalLinkAlt />
                        <span>Voir l&apos;email de test</span>
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setFormStatus("idle");
                      setPreviewUrl(null);
                    }}
                    className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Nom{" "}
                      <span className="text-red-400" aria-hidden="true">
                        *
                      </span>
                      <span className="sr-only">requis</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 bg-zinc-800 border ${
                        fieldErrors.name ? "border-red-500" : "border-zinc-700"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white`}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={
                        fieldErrors.name ? "name-error" : undefined
                      }
                      disabled={isSubmitting}
                    />
                    {fieldErrors.name && (
                      <p
                        id="name-error"
                        className="mt-1 text-sm text-red-400"
                        role="alert"
                      >
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email pour vous répondre{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 bg-zinc-800 border ${
                        fieldErrors.email ? "border-red-500" : "border-zinc-700"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white`}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={
                        fieldErrors.email ? "email-error" : undefined
                      }
                      disabled={isSubmitting}
                      placeholder="Votre adresse email pour recevoir notre réponse"
                    />
                    {fieldErrors.email && (
                      <p
                        id="email-error"
                        className="mt-1 text-sm text-red-400"
                        role="alert"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2 bg-zinc-800 border ${
                        fieldErrors.subject
                          ? "border-red-500"
                          : "border-zinc-700"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white`}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.subject}
                      aria-describedby={
                        fieldErrors.subject ? "subject-error" : undefined
                      }
                      disabled={isSubmitting}
                    />
                    {fieldErrors.subject && (
                      <p
                        id="subject-error"
                        className="mt-1 text-sm text-red-400"
                        role="alert"
                      >
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      className={`w-full px-4 py-2 bg-zinc-800 border ${
                        fieldErrors.message
                          ? "border-red-500"
                          : "border-zinc-700"
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-white resize-none`}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={
                        fieldErrors.message ? "message-error" : undefined
                      }
                      disabled={isSubmitting}
                    ></textarea>
                    {fieldErrors.message && (
                      <p
                        id="message-error"
                        className="mt-1 text-sm text-red-400"
                        role="alert"
                      >
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* CAPTCHA */}
                  <div className="pt-2 border-t border-zinc-700">
                    <div className="flex items-center mb-2">
                      <FaShieldAlt className="text-purple-400 mr-2" />
                      <span className="text-sm font-medium text-gray-300">
                        Vérification anti-spam
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded-md mb-3">
                      <p className="text-sm mb-2">{captcha.question}</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="captcha"
                          name="captcha"
                          value={formData.captcha}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`flex-1 px-3 py-1 bg-zinc-700 border ${
                            fieldErrors.captcha
                              ? "border-red-500"
                              : "border-zinc-600"
                          } rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 text-white`}
                          required
                          aria-required="true"
                          aria-invalid={!!fieldErrors.captcha}
                          aria-describedby={
                            fieldErrors.captcha ? "captcha-error" : undefined
                          }
                          inputMode="numeric"
                          pattern="[0-9]+"
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-md text-xs"
                          disabled={isSubmitting}
                        >
                          Rafraîchir
                        </button>
                      </div>
                    </div>
                  </div>

                  {formStatus === "error" && (
                    <p className="text-red-400 text-sm">
                      {errorMessage ||
                        "Veuillez remplir tous les champs obligatoires."}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner
                          className="animate-spin"
                          aria-hidden="true"
                        />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <FaEnvelope aria-hidden="true" />
                        <span>Envoyer</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
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
