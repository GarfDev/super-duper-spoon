import { useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRevalidator,
} from '@remix-run/react';
import { ManifestLink, useSWEffect } from '@remix-pwa/sw';
import type { LinksFunction } from '@remix-run/node';

import './tailwind.css';
import Providers from './providers';
import { NavigationBar } from './components';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {

  useSWEffect();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <ManifestLink manifestUrl="/manifest.webmanifest" />
        <Links />
      </head>
      <body className='dark text-foreground bg-background'>
        <Providers>
          <NavigationBar />
          {children}
          <ScrollRestoration />
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}

export default function App() {
  const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, [revalidator]);

  return <Outlet />;
}
