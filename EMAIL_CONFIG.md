# Configuration du système d'envoi d'emails

Ce document explique comment configurer le système d'envoi d'emails pour le formulaire de contact de 3W Solutions.

## Fonctionnalités de Sécurité

Le système d'envoi d'emails comprend plusieurs couches de sécurité :

1. **CAPTCHA intégré** - Une protection simple contre les robots
2. **Validation d'Email** - Vérification que les adresses email sont au format valide
3. **Détection de Spam** - Filtrage des messages contenant des mots-clés suspects
4. **Rate Limiting** - Limite du nombre d'emails envoyés par adresse IP
5. **Validation de Formulaire** - Vérification des données côté client et serveur
6. **Signature des Messages** - Protection contre l'usurpation d'identité via l'envoi depuis une adresse système officielle

### Système de Signature des Messages

Pour empêcher l'usurpation d'identité et clarifier l'origine des messages :

- Les emails sont **toujours envoyés depuis l'adresse officielle** du site (système)
- Le champ **Reply-To** est configuré avec l'email de l'utilisateur pour permettre la réponse directe
- L'**en-tête du message indique clairement** qu'il a été envoyé via le formulaire
- Le **sujet du message est préfixé** avec "[Formulaire de Contact]"
- Une **clause de non-responsabilité** est incluse au bas de chaque message

Cela permet de s'assurer que personne ne peut utiliser le formulaire pour envoyer des emails en se faisant passer pour quelqu'un d'autre.

## Mode Test (Développement)

Pour faciliter les tests pendant le développement, l'application utilise **Ethereal Email**, un service de faux emails qui permet de visualiser les emails envoyés sans avoir besoin de configurer un vrai compte email.

### Comment utiliser le mode test

1. En mode développement (`npm run dev`), le mode Ethereal est automatiquement activé
2. Remplissez et soumettez le formulaire de contact
3. L'application va automatiquement :
   - Créer un compte temporaire Ethereal
   - Envoyer l'email à ce compte (aucun vrai email n'est envoyé)
   - Afficher un lien pour prévisualiser l'email

Ce mode est idéal pour tester le formulaire sans risquer d'envoyer des emails réels pendant le développement.

## Configuration de Production

Pour que le formulaire de contact envoie de vrais emails en production, vous devez configurer les variables d'environnement suivantes :

1. Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
CONTACT_EMAIL=contact@3wsolution.fr
```

## Utilisation avec Gmail

Si vous utilisez Gmail comme service d'envoi d'emails, vous devez suivre ces étapes supplémentaires :

1. Activez l'authentification à deux facteurs sur votre compte Google
2. Créez un "mot de passe d'application" spécifique pour cette application
   - Allez dans les paramètres de votre compte Google
   - Sécurité > Connexion à Google > Mots de passe des applications
   - Sélectionnez "Autre (nom personnalisé)" et donnez un nom (par exemple "3W Solution Website")
   - Cliquez sur "Générer"
   - Utilisez le mot de passe généré comme valeur pour `EMAIL_PASSWORD` dans votre fichier `.env.local`

## Utilisation avec d'autres services d'email

Si vous souhaitez utiliser un autre service d'email, vous devrez modifier le fichier `src/app/api/send-email/route.ts` :

1. Modifiez la configuration du transporteur Nodemailer selon la documentation du service que vous utilisez

```typescript
// Exemple pour utiliser un serveur SMTP personnalisé
const transporter = nodemailer.createTransport({
  host: "smtp.votreserveur.com",
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});
```

## Dépannage

Si vous rencontrez des problèmes avec l'envoi d'emails :

1. Vérifiez que les variables d'environnement sont correctement configurées
2. Si vous utilisez Gmail, assurez-vous que vous utilisez un mot de passe d'application et non votre mot de passe normal
3. Consultez les logs du serveur pour d'éventuelles erreurs
4. Assurez-vous que votre service d'email n'a pas de restrictions sur l'envoi d'emails automatisés

## Personnalisation du template d'email

Le template HTML de l'email se trouve dans le fichier `src/app/api/send-email/route.ts`. Vous pouvez le modifier selon vos besoins pour changer le style ou ajouter des informations supplémentaires.
