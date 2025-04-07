/**
 * Utilitaire pour accéder aux variables d'environnement
 * côté serveur de manière sécurisée
 */

export function getServerConfig() {
  // Détermine si nous sommes en environnement de développement
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    // Variables d'environnement pour l'envoi d'emails
    isDevelopment,
    useTestMode: false, // Désactivé pour utiliser le serveur OVH réel
    emailUser: process.env.EMAIL_USER || "",
    emailPassword: process.env.EMAIL_PASSWORD || "",
    contactEmail: process.env.CONTACT_EMAIL || "contact@3wsolution.fr",
    // Configuration de sécurité
    maxEmailsPerHour: 10, // Limite le nombre d'emails par IP
    enableSecurityCheck: true, // Active les vérifications de sécurité
  };
}
