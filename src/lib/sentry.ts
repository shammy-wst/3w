import * as Sentry from "@sentry/nextjs";
import type { Event } from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", "3wsolution.fr"],
    }),
  ],
  beforeSend(event: Event) {
    // Nettoyer les données sensibles si nécessaire
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    return event;
  },
});
