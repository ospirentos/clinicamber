import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { HeroUIProvider } from "@heroui/react";
import i18next from "i18next";
import { initReactI18next, useSSR } from 'react-i18next';
import Backend from 'i18next-http-backend';
import type { Route } from "./+types/root";
import AmberNavbar from "./components/amber-navbar/amber-navbar";
import "./i18n";
import "./app.css";
import AmberFooter from "./components/amber-footer/amber-footer";
import type { Service, ServiceRequestModel } from "./models/service.model";
import type { DoctorRequestModel } from "./models/doctor.model";

export interface RootLoader {
  ENV: { GOOGLE_API_KEY: string, WEB_CMS_BASE_URL: string, [key: string]: string },
  services: ServiceRequestModel,
  doctors: DoctorRequestModel,
  initialLanguage: string,
  initialI18nStore: Record<string, any>
}

export const links: Route.LinksFunction = () => [
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "icon", href: "data:image/x-icon;base64,AA" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export const meta = () => [
  {
    name: "viewport",
    content:
      "width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0",
  },
];

export async function loader({ request }: { request: Request }) {
  const locale = request.headers.get('accept-language')?.split(',')[0] || 'tr-TR';
  const i18nInstance = i18next.createInstance();
  const baseUrl = request.url.match(/https?:\/\/[^\/]+/gm)?.[0];

  await i18nInstance
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng: locale,
      fallbackLng: 'tr',
      load: "languageOnly",
      backend: {
        loadPath: baseUrl + '/locales/{{lng}}/{{ns}}.json',
      }
    });

  const initialLanguage = i18nInstance.language;
  const initialI18nStore = i18nInstance.store.data;
  const apiUrl = process.env.API_URL;
  const publicToken = process.env.PUBLIC_WEB_TOKEN;

  // Fetch services data
  let services = await fetch(
    apiUrl +
    "services?" +
    new URLSearchParams({
      locale: locale,
      "populate[image][fields][0]": "url",
    }),
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + publicToken,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    }
  ).then((res) => res.json());

  // Fetch doctors data
  let doctors = await fetch(
    apiUrl +
    "doctors?" +
    new URLSearchParams({
      locale: locale,
      "populate[image][fields][0]": "url",
    }),
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + publicToken,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    }
  ).then((res) => res.json());
  let ENV = { GOOGLE_API_KEY: process.env.GOOGLE_API_KEY, WEB_CMS_BASE_URL: process.env.WEB_CMS_BASE_URL };

  return ({ ENV, services, doctors, initialLanguage, initialI18nStore } as RootLoader);
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { initialI18nStore, initialLanguage } = useLoaderData();
  useSSR(initialI18nStore, initialLanguage);
  return (
    <html lang={initialLanguage}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <HeroUIProvider>
          <div className="flex flex-col min-h-screen">
            <AmberNavbar />
            {children}
            <AmberFooter />
          </div>
          <ScrollRestoration />
          <Scripts />
        </HeroUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    const scriptGTagUrl = document.createElement('script');
    const scriptGTagCode = document.createElement('script');
    const scriptSiteName = document.createElement('script');
    scriptGTagUrl.src = "https://www.googletagmanager.com/gtag/js?id=AW-16765335204";
    scriptGTagCode.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-16765335204');
            `;
    scriptSiteName.innerHTML = `
      {
        "@context" : "https://schema.org",
        "@type" : "WebSite",
        "name" : "Amber Ağız ve Diş Sağlığı Polikliniği",
        "url" : "https://clinicamber.com/"
      }`;
    scriptSiteName.type = "application/ld+json";
    document.head.appendChild(scriptSiteName);
    document.head.appendChild(scriptGTagUrl);
    document.head.appendChild(scriptGTagCode);
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
