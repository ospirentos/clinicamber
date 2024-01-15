import React from "react";
import {
    Links,
    Link,
    Meta,
    Outlet,
    Scripts,
    LiveReload,
    useLoaderData
} from "@remix-run/react";
import {NextUIProvider} from "@nextui-org/system";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/navbar";
import stylesheet from "./tailwind.css";
import { AmberLogo } from "./images/AmberLogo";
import { SectionTitle } from "./components/SectionTitle";
import { DentistCard } from "./components/DentistCard";
import { ServiceCard } from "./components/ServiceCard";
import { BlogCard } from "./components/BlogCard";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import i18next from "./i18next.server";
import { GoogleMap } from "./components/GoogleMap";
import clinicAmberFooterLogo from "./images/clinic_amber_footer_logo.png";
import { FooterFacebookIcon } from "./images/FooterFacebookIcon";
import { FooterTwitterIcon } from "./images/FooterTwitterIcon";
import { FooterInstagramIcon } from "./images/FooterInstagramIcon";
import { WhatsAppFloatingButton } from "./images/WhatsAppFloatingButton";

export const links = () => [
    { rel: "stylesheet", href: stylesheet },
]

export const meta = () => ([
  {name: "viewport", content: "width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"}
])

export async function loader({ request }) {
  let locale = await i18next.getLocale(request);
  let doctors = await fetch("http://cms.clinicamberd.com/api/doctors?" + new URLSearchParams({
    locale: locale,
    "populate[image][fields][0]": "url",
  }),
  {
    method: 'get', 
    headers: new Headers({
        'Authorization': 'Bearer '+'9781a69030e69996f5e103bc7425adcd919f712a6d65862753ca5052b9c63eac85e8a32a1861dec6947dbca4fc9398b4414c605f43a6472c071365fadab19ff135c4ee72f90e5fa501e5bc3ef55c76af7177b9dd27587fbc2e946ea9e8ef9aeaaff8c7c29c9417c1ba882497fffbd94fbcd0167670bda820679860eef965ee9c',
        'Content-Type': 'application/x-www-form-urlencoded'
    }),
}).then(res => res.json());
let services = await fetch("http://cms.clinicamberd.com/api/services?" + new URLSearchParams({
    locale: locale,
    "populate[image][fields][0]": "url",
  }),
  {
    method: 'get', 
    headers: new Headers({
        'Authorization': 'Bearer '+'9781a69030e69996f5e103bc7425adcd919f712a6d65862753ca5052b9c63eac85e8a32a1861dec6947dbca4fc9398b4414c605f43a6472c071365fadab19ff135c4ee72f90e5fa501e5bc3ef55c76af7177b9dd27587fbc2e946ea9e8ef9aeaaff8c7c29c9417c1ba882497fffbd94fbcd0167670bda820679860eef965ee9c',
        'Content-Type': 'application/x-www-form-urlencoded'
    }),
}).then(res => res.json());

let blogs = await fetch("http://cms.clinicamberd.com/api/blogs?" + new URLSearchParams({
  locale: locale,
  "populate[image][fields][0]": "url",
}),
{
  method: 'get', 
  headers: new Headers({
      'Authorization': 'Bearer '+'9781a69030e69996f5e103bc7425adcd919f712a6d65862753ca5052b9c63eac85e8a32a1861dec6947dbca4fc9398b4414c605f43a6472c071365fadab19ff135c4ee72f90e5fa501e5bc3ef55c76af7177b9dd27587fbc2e946ea9e8ef9aeaaff8c7c29c9417c1ba882497fffbd94fbcd0167670bda820679860eef965ee9c',
      'Content-Type': 'application/x-www-form-urlencoded'
  }),
}).then(res => res.json());

  return ({ locale, doctors, services, blogs });
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);

  let { locale, doctors, services, blogs } = useLoaderData();

  console.log(doctors)

  let { i18n, t } = useTranslation();

  useChangeLanguage(locale);

  const menuItems = [
      {
        text: "home",
        link: "/"
      },
      {
        text: "services",
        link: "/"
      },
      {
        text: "doctors",
        link: "/"
      },
      {
        text: "blog",
        link: "/"
      },
      {
        text: "contact",
        link: "/"
      }
    ];

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
              <NavbarBrand href="/">
                <div style={{width: "90px"}}>
                  <AmberLogo />
                </div>
                <span >
                  <div className="text-amber-500 font-semibold text-lg leading-3">Amber</div>
                  <span className="text-amber-500 text-base">{t("bannerTitle")}</span>
                </span>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem href="/homepage" className="hover:text-amber-500 transition"><Link href="#">{t("home")}</Link></NavbarItem>
              <NavbarItem href="/services" className="hover:text-amber-500 transition"><Link href="#">{t("services")}</Link></NavbarItem>
              <NavbarItem href="/doctors" className="hover:text-amber-500 transition"><Link href="#">{t("doctors")}</Link></NavbarItem>
              <NavbarItem href="/blog" className="hover:text-amber-500 transition"><Link href="#">{t("blog")}</Link></NavbarItem>
              <NavbarItem href="/contact" className="hover:text-amber-500 transition"><Link href="#">{t("contact")}</Link></NavbarItem>
            </NavbarContent>
            <NavbarMenu>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item.text}-${index}`}>
                  <Link
                    color={
                        index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
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
          <div className="flex items-center w-full h-auto justify-center">
            <div className="px-6 w-full max-w-[1024px]">
              <SectionTitle title={t("doctors")} />
              <div className="flex gap-4 overflow-x-auto sm:max-w-[900px] sm:gap-6 sm:grid sm:grid-cols-12 sm:grid-rows-auto px-8">
                {doctors.data.map((doctor, index) => (<DentistCard key={`${doctor.id}`} image={doctor.attributes.image.data.attributes.url} name={doctor.attributes.name} title={doctor.attributes.role} slug={doctor.attributes.slug}/>))}
              </div>
              <SectionTitle title={t("services")} />
                <div className="flex gap-4 overflow-x-auto sm:max-w-[900px] sm:gap-2 sm:grid sm:grid-cols-12 sm:grid-rows-auto px-8">
                  {services.data.map((service, index) => (<ServiceCard key={`${service.id}`} image={service.attributes.image.data.attributes.url} title={service.attributes.title} shortText={service.attributes.shortText} />))}
                </div>
              <SectionTitle title={t("blog")} />
                <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-auto px-8">
                  {blogs.data.map((blog, index) => (<BlogCard key={`${blog.id}`} image={blog.attributes.image.data.attributes.url} firstTitle={blog.attributes.firstTitle} secondTitle={blog.attributes.secondTitle} />))} 
                </div>
              <SectionTitle title={t("contact")} />
                <div className="flex gap-4 flex-wrap">
                  <div className="w-full sm:w-1/2">
                    <h2 className="text-xl" >Adres</h2>
                      <p className="my-4">
                        Orhangazi, Esenyalı Orhangazi Mah, Alparslan Türkeş Cd No:2/A.<br /><br />
                        Pendik/İstanbul
                      </p>
                      <GoogleMap />
                  </div>
                  <div className="w-full sm:w-1/3">
                    <h2 className="text-xl">Bize Ulaşın</h2>
                  </div>
                </div>
            </div>
          </div>
          <div className="z-20 fixed right-4 bottom-6 sm:right-6 sm:top-20">
                      <a className="" href="https://wa.me/905437622003?text=I'm%20interested%20in%20your%20car%20for%20sale">
                        <WhatsAppFloatingButton /> 
                      </a>
                    </div>
          <Outlet />
          <footer className="w-full h-auto bottom-0 left-0 px-6 py-24 flex items-center justify-center flex-col">
              <div className="flex gap-4 max-w-[1024px] mb-4">
                <div className="flex justify-between items-center flex-1">
                    <img src={clinicAmberFooterLogo} alt="Clinic Amber Logo" className="w-full sm:w-1/2 h-auto" />
                    <div className="hidden sm:block">
                      <div>+90 212 567 89 90</div>
                      <div>info@clinicamber.com</div>
                    </div>
                  
                </div>
                <div className="flex justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2"><FooterFacebookIcon /> Facebook</div>
                    <div className="flex items-center gap-2"><FooterTwitterIcon /> Twitter</div>
                    <div className="flex items-center gap-2"><FooterInstagramIcon /> Instagram</div>
                    <div className="sm:hidden">+90 212 567 89 90</div>
                    <div className="sm:hidden">info@clinicamber.com</div>
                  </div>
                  <div className="hidden sm:block">Orhangazi, Esenyalı Orhangazi Mah, Alparslan Türkeş Cd No:2/A. Pendik/İstanbul</div>
                </div>
              </div>
              <div className="flex gap-4 flex-col sm:flex-row w-full max-w-[1024px] mx-6 py-4 border-t border-amber-400 justify-between items-center">
                <div >Kişisel Veri İzleme Politikası</div>
                <div>Copyright © 2023 Clinic Amber | Tüm hakları saklıdır</div>
              </div>
          </footer>
          <Scripts />
          <LiveReload />
        </NextUIProvider>
      </body>
    </html>
  );
}
  