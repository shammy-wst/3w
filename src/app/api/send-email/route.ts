import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getServerConfig } from "@/lib/config";

// Base de données simple en mémoire pour le rate limiting
const ipRequestCounts: Record<string, { count: number; timestamp: number }> =
  {};

// Fonctions de sécurité
function validateEmail(email: string): boolean {
  // Validation d'email plus stricte
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function checkForSpam(content: string): boolean {
  // Liste simple de mots-clés de spam
  const spamKeywords = [
    "casino",
    "viagra",
    "lottery",
    "winner",
    "free money",
    "buy now",
  ];
  return spamKeywords.some((keyword) =>
    content.toLowerCase().includes(keyword)
  );
}

function checkRateLimit(
  ip: string,
  config: ReturnType<typeof getServerConfig>
): boolean {
  const now = Date.now();
  const hourAgo = now - 3600000; // 1 heure en millisecondes

  // Initialise ou met à jour le compteur pour cette IP
  if (!ipRequestCounts[ip] || ipRequestCounts[ip].timestamp < hourAgo) {
    ipRequestCounts[ip] = { count: 1, timestamp: now };
    return true;
  }

  // Vérifie si la limite est atteinte
  if (ipRequestCounts[ip].count >= config.maxEmailsPerHour) {
    return false;
  }

  // Incrémente le compteur
  ipRequestCounts[ip].count += 1;
  return true;
}

// Fonction pour récupérer l'IP réelle du client
function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwardedFor) {
    // Prend la première IP de la liste (la plus proche du client)
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // Fallback sur l'IP directe
  return "unknown";
}

export async function POST(req: Request) {
  try {
    // Récupérer l'adresse IP réelle du client
    const clientIp = getClientIp(req);

    // Récupération des données du formulaire
    const { name, email, subject, message } = await req.json();

    // Récupération des informations de configuration
    const config = getServerConfig();

    // 1. Vérifications de sécurité de base
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    // 2. Vérifications de sécurité avancées
    if (config.enableSecurityCheck) {
      // Valider l'email
      if (!validateEmail(email)) {
        return NextResponse.json(
          { error: "L'adresse email n'est pas valide" },
          { status: 400 }
        );
      }

      // Vérifier le rate limiting avec l'IP réelle
      if (!checkRateLimit(clientIp, config)) {
        return NextResponse.json(
          {
            error:
              "Trop de messages envoyés récemment. Veuillez réessayer plus tard.",
          },
          { status: 429 }
        );
      }

      // Vérifier le contenu pour détecter le spam
      if (checkForSpam(message) || checkForSpam(subject || "")) {
        return NextResponse.json(
          {
            error:
              "Le message a été détecté comme potentiellement indésirable.",
          },
          { status: 400 }
        );
      }
    }

    // Configuration du transporteur et des options de mail
    let transporter;
    let mailOptions;
    let testAccount;

    // FORCE TEST MODE en développement ou si demandé dans la configuration
    if (config.useTestMode) {
      console.log("Mode test activé: Utilisation d'Ethereal Email...");

      // Création d'un compte Ethereal temporaire
      testAccount = await nodemailer.createTestAccount();

      // Configuration du transporteur Ethereal
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      // Configuration du mail pour le test avec signature sécurisée
      mailOptions = {
        // L'email est toujours envoyé depuis l'adresse du système (Ethereal dans ce cas)
        from: `3W Solution <${testAccount.user}>`,
        to: config.contactEmail,
        // Le Reply-To permet au destinataire de répondre directement à l'utilisateur
        replyTo: email,
        // Le sujet indique clairement l'origine du message
        subject: `[Formulaire de Contact] ${subject || `Message de ${name}`}`,
        text: `
        MESSAGE ENVOYÉ VIA LE FORMULAIRE DE CONTACT

        Expéditeur: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        ---------------------------------------
        Cet email a été envoyé via le formulaire de contact du site 3W Solution.
        L'équipe 3W Solution n'est pas responsable du contenu de ce message.
        Pour toute question, contactez-nous à contact@3wsolution.fr
        ---------------------------------------
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #6366f1; margin-bottom: 20px;">
              <p style="margin: 0; color: #4b5563; font-size: 14px;">⚠️ MESSAGE ENVOYÉ VIA LE FORMULAIRE DE CONTACT</p>
            </div>
            
            <h2 style="color: #6366f1;">Message depuis le site 3W Solution</h2>
            
            <div style="background-color: #f9fafb; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0;"><strong>Expéditeur:</strong> ${name}</p>
              <p style="margin: 8px 0 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a></p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #6366f1;">
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #6b7280;">
                Cet email a été envoyé via le formulaire de contact du site 3W Solution.<br>
                L'équipe 3W Solution n'est pas responsable du contenu de ce message.<br>
                Pour toute question, contactez-nous à <a href="mailto:contact@3wsolution.fr" style="color: #6366f1;">contact@3wsolution.fr</a>
              </p>
            </div>
          </div>
        `,
      };
    } else {
      // MODE PRODUCTION avec OVH ou autre service
      if (!config.emailUser || !config.emailPassword) {
        console.error(
          "Erreur: Informations d'authentification email manquantes"
        );
        return NextResponse.json(
          {
            error:
              "Configuration du serveur d'emails incomplète. Veuillez contacter l'administrateur.",
          },
          { status: 500 }
        );
      }

      // Configuration du transporteur d'email pour OVH
      transporter = nodemailer.createTransport({
        host: "pro3.mail.ovh.net", // Serveur pour mail Pro
        port: 587,
        secure: false,
        auth: {
          user: config.emailUser, // L'adresse complète
          pass: config.emailPassword,
        },
        debug: config.isDevelopment,
      });

      // Configuration du mail avec signature sécurisée
      mailOptions = {
        // L'email est toujours envoyé depuis l'adresse du système
        from: `3W Solution <${config.emailUser}>`,
        to: config.contactEmail,
        // Le Reply-To permet au destinataire de répondre directement à l'utilisateur
        replyTo: email,
        // Le sujet indique clairement l'origine du message
        subject: `[Formulaire de Contact] ${subject || `Message de ${name}`}`,
        text: `
        MESSAGE ENVOYÉ VIA LE FORMULAIRE DE CONTACT

        Expéditeur: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        ---------------------------------------
        Cet email a été envoyé via le formulaire de contact du site 3W Solution.
        L'équipe 3W Solution n'est pas responsable du contenu de ce message.
        Pour toute question, contactez-nous à contact@3wsolution.fr
        ---------------------------------------
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #6366f1; margin-bottom: 20px;">
              <p style="margin: 0; color: #4b5563; font-size: 14px;">⚠️ MESSAGE ENVOYÉ VIA LE FORMULAIRE DE CONTACT</p>
            </div>
            
            <h2 style="color: #6366f1;">Message depuis le site 3W Solution</h2>
            
            <div style="background-color: #f9fafb; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; margin-bottom: 20px;">
              <p style="margin: 0;"><strong>Expéditeur:</strong> ${name}</p>
              <p style="margin: 8px 0 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #6366f1;">${email}</a></p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #6366f1;">
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #6b7280;">
                Cet email a été envoyé via le formulaire de contact du site 3W Solution.<br>
                L'équipe 3W Solution n'est pas responsable du contenu de ce message.<br>
                Pour toute question, contactez-nous à <a href="mailto:contact@3wsolution.fr" style="color: #6366f1;">contact@3wsolution.fr</a>
              </p>
            </div>
          </div>
        `,
      };
    }

    try {
      // Envoi de l'email
      const info = await transporter.sendMail(mailOptions);

      // Si nous sommes en mode test, affichons l'URL de prévisualisation Ethereal
      if (testAccount) {
        console.log("Message envoyé: %s", info.messageId);
        console.log(
          "URL de prévisualisation: %s",
          nodemailer.getTestMessageUrl(info)
        );

        // Ajouter l'URL de prévisualisation à la réponse pour le développement
        return NextResponse.json({
          success: true,
          previewUrl: nodemailer.getTestMessageUrl(info),
        });
      }

      // Réponse standard en mode production
      return NextResponse.json({ success: true });
    } catch (sendError: Error | unknown) {
      console.error("Erreur lors de l'envoi de l'email:", sendError);
      const errorMessage =
        sendError instanceof Error ? sendError.message : "Erreur inconnue";
      return NextResponse.json(
        {
          error:
            "Erreur technique lors de l'envoi de l'email. Veuillez réessayer ultérieurement.",
          details: config.isDevelopment ? errorMessage : undefined,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erreur générale:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de votre demande." },
      { status: 500 }
    );
  }
}
