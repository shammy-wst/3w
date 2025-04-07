// Déclarations de types pour le Service Worker

interface ExtendableEvent extends Event {
  waitUntil(promise: Promise<any>): void;
}

interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Response | Promise<Response>): void;
}

interface ServiceWorkerGlobalScope {
  skipWaiting(): Promise<void>;
  addEventListener(
    type: string,
    listener: (event: Event | ExtendableEvent | FetchEvent) => void
  ): void;
}

declare const self: ServiceWorkerGlobalScope;
