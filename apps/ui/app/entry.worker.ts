/// <reference lib="WebWorker" />

import {
  EnhancedCache,
  isDocumentRequest,
  isLoaderRequest,
  Logger,
  NavigationHandler,
  WorkerDataFunctionArgs,
} from "@remix-pwa/sw";

const logger = new Logger({
  prefix: "[GGWP-SW]",
});

const dataCache = new EnhancedCache("data-cache", {
  strategy: "NetworkFirst",
  strategyOptions: {
    // options for the network first strategy
    maxEntries: 50,
    maxAgeSeconds: 3_600 * 24, // 1 day
    networkTimeoutInSeconds: 5,
  },
});

const documentCache = new EnhancedCache("page-cache", {
  strategy: "NetworkFirst",
  strategyOptions: {
    // options for the network first strategy
    maxEntries: 25,
    maxAgeSeconds: 3_600 * 24 * 7, // 7 days
  },
});

const assetCache = new EnhancedCache("asset-cache", {
  strategy: "CacheFirst",
  strategyOptions: {
    // options for cache first
    maxAgeSeconds: 3_600 * 24 * 90, // 90 days
  },
});

const messageHandler = new NavigationHandler({
  cache: documentCache,
  logger,
});

export const defaultFetchHandler = ({ context }: WorkerDataFunctionArgs) => {
  const { request } = context.event;
  const url = new URL(request.url);

  if (isDocumentRequest(request)) {
    return documentCache.handleRequest(request);
  }

  if (isLoaderRequest(request)) {
    return dataCache.handleRequest(request);
  }

  if (self.__workerManifest.assets.includes(url.pathname)) {
    return assetCache.handleRequest(request);
  }

  return fetch(request);
};

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  logger.log("Service worker installed");

  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  logger.log("Service worker activated");

  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event: ExtendableMessageEvent) => {
  event.waitUntil(messageHandler.handleMessage(event));
});

export {};
