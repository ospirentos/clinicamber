import React from "react";
import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  useLoaderData,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/system";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import stylesheet from "./tailwind.css";
import { AmberLogo } from "./images/AmberLogo";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import i18next from "./i18next.server";
import clinicAmberFooterLogo from "./images/clinic_amber_footer_logo.png";
import { FooterFacebookIcon } from "./images/FooterFacebookIcon";
import { FooterTwitterIcon } from "./images/FooterTwitterIcon";
import { FooterInstagramIcon } from "./images/FooterInstagramIcon";

export async function loader({ request }) {
  let locale = await i18next.getLocale(request);

  let ENV = {GOOGLE_API_KEY: process.env.GOOGLE_API_KEY}

  return { locale, ENV };
}

export const links = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta = () => [
  {
    name: "viewport",
    content:
      "width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0",
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);

  let { locale, ENV } = useLoaderData();

  let { i18n, t } = useTranslation();

  useChangeLanguage(locale);

  const menuItems = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "services",
      link: "/",
    },
    {
      text: "doctors",
      link: "/",
    },
    {
      text: "blog",
      link: "/",
    },
    {
      text: "contact",
      link: "/",
    },
  ];

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body className="font-poppins">
        <NextUIProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar onMenuOpenChange={setIsMenuOpen}>
              <NavbarContent>
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
                />
                <NavbarBrand href="/">
                  <div style={{ width: "90px" }}>
                    <AmberLogo />
                  </div>
                  <span>
                    <div className="text-amber-500 font-semibold text-lg leading-3">
                      Amber
                    </div>
                    <span className="text-amber-500 text-base">
                      {t("bannerTitle")}
                    </span>
                  </span>
                </NavbarBrand>
              </NavbarContent>
              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem
                  href="/homepage"
                  className="hover:text-amber-500 transition"
                >
                  <Link href="#">{t("home")}</Link>
                </NavbarItem>
                <NavbarItem
                  href="/services"
                  className="hover:text-amber-500 transition"
                >
                  <Link href="#">{t("services")}</Link>
                </NavbarItem>
                <NavbarItem
                  href="/doctors"
                  className="hover:text-amber-500 transition"
                >
                  <Link href="#">{t("doctors")}</Link>
                </NavbarItem>
                <NavbarItem
                  href="/blog"
                  className="hover:text-amber-500 transition"
                >
                  <Link href="#">{t("blog")}</Link>
                </NavbarItem>
                <NavbarItem
                  href="/contact"
                  className="hover:text-amber-500 transition"
                >
                  <Link href="#">{t("contact")}</Link>
                </NavbarItem>
              </NavbarContent>
              <NavbarMenu>
                {menuItems.map((item, index) => (
                  <NavbarMenuItem key={`${item.text}-${index}`}>
                    <Link
                      color={
                        index === 2
                          ? "primary"
                          : index === menuItems.length - 1
                            ? "danger"
                            : "foreground"
                      }
                      className="w-full"
                      href="#"
                      size="lg"
                    >
                      {t(item.text)}
                    </Link>
                  </NavbarMenuItem>
                ))}
              </NavbarMenu>
            </Navbar>

            <Outlet />

            <footer className="w-full h-auto bottom-0 left-0 px-6 py-12 flex items-center justify-center flex-col">
              <div className="flex gap-4 max-w-[1024px] mb-4">
                <div className="flex justify-between items-center flex-1">
                  <img
                    src={clinicAmberFooterLogo}
                    alt="Clinic Amber Logo"
                    className="w-full sm:w-1/2 h-auto"
                  />
                  <div className="hidden sm:block">
                    <div>+90 212 567 89 90</div>
                    <div>info@clinicamber.com</div>
                  </div>
                </div>
                <div className="flex justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <FooterFacebookIcon /> Facebook
                    </div>
                    <div className="flex items-center gap-2">
                      <FooterTwitterIcon /> Twitter
                    </div>
                    <div className="flex items-center gap-2">
                      <FooterInstagramIcon /> Instagram
                    </div>
                    <a href="tel:5437622003">
                      <div className="sm:hidden">+90 212 567 89 90</div>
                    </a>
                    <div className="sm:hidden">info@clinicamber.com</div>
                  </div>
                  <div className="hidden sm:block">
                    Orhangazi, Esenyalı Orhangazi Mah, Alparslan Türkeş Cd
                    No:2/A. Pendik/İstanbul
                  </div>
                </div>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row w-full max-w-[1024px] mx-6 py-4 border-t border-amber-400 justify-between items-center">
                <div>Kişisel Veri İzleme Politikası</div>
                <div>Copyright © 2024 Clinic Amber | Tüm hakları saklıdır</div>
              </div>
            </footer>
            <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)}`,
            }}
            />
            <Scripts />
            <LiveReload port={3001}/>
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
