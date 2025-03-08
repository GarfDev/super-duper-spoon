import { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import { ManifestLink, useSWEffect } from "@remix-pwa/sw";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import Providers from "./providers";
import { NavigationBar } from "./components";
import { createSeverClient } from "./supabase.server";
import { Session } from "@supabase/supabase-js";
import { AppContext } from "./types/AppContext";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader(
  { request }: LoaderFunctionArgs,
) {
  const { supabase, headers } = createSeverClient(request);

  const response = await supabase.auth.getUser();
  const isLoggedIn = response.data.user != null;

  return Response.json({ user: response.data.user, isLoggedIn }, {
    headers,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, user } = useLoaderData<typeof loader>() as AppContext;

  // Register the service worker
  // Using at this level will allow Service Worker
  // to "listen" to all requests of application
  useSWEffect();

  // Main Return
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <ManifestLink manifestUrl="/manifest.webmanifest" />
        <Links />
      </head>
      <body className="dark text-foreground bg-background">
        <Providers>
          <NavigationBar user={user} isLoggedIn={isLoggedIn} />
          {children}
          <ScrollRestoration />
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}

export default function App() {
  const { isLoggedIn, session } = useLoaderData<typeof loader>() as {
    session: Session | null;
    isLoggedIn: boolean;
  };

  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, []);

  return <Outlet context={{ isLoggedIn, session }} />;
}
