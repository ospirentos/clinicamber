import React from "react";
import {
    useLoaderData
} from "@remix-run/react";

import { SectionTitle } from "../components/SectionTitle";
import { DentistCard } from "../components/DentistCard";
import { ServiceCard } from "../components/ServiceCard";
import { BlogCard } from "../components/BlogCard";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import i18next from "../i18next.server";
import { GoogleMap } from "../components/GoogleMap";
import { WhatsAppFloatingButton } from "../images/WhatsAppFloatingButton";

export async function loader({ request }) {
    let locale = await i18next.getLocale(request);
    let doctors = await fetch("http://cms.clinicamberd.com/api/doctors?" + new URLSearchParams({
      locale: locale,
      "populate[image][fields][0]": "url",
    }),
    {
      method: 'get', 
      headers: new Headers({
          'Authorization': 'Bearer 9781a69030e69996f5e103bc7425adcd919f712a6d65862753ca5052b9c63eac85e8a32a1861dec6947dbca4fc9398b4414c605f43a6472c071365fadab19ff135c4ee72f90e5fa501e5bc3ef55c76af7177b9dd27587fbc2e946ea9e8ef9aeaaff8c7c29c9417c1ba882497fffbd94fbcd0167670bda820679860eef965ee9c',
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
          'Authorization': 'Bearer 9781a69030e69996f5e103bc7425adcd919f712a6d65862753ca5052b9c63eac85e8a32a1861dec6947dbca4fc9398b4414c605f43a6472c071365fadab19ff135c4ee72f90e5fa501e5bc3ef55c76af7177b9dd27587fbc2e946ea9e8ef9aeaaff8c7c29c9417c1ba882497fffbd94fbcd0167670bda820679860eef965ee9c',
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
        'Authorization': 'Bearer 9781a69030e69996f5e103bc7425adcd919f712a6d65862753ca5052b9c63eac85e8a32a1861dec6947dbca4fc9398b4414c605f43a6472c071365fadab19ff135c4ee72f90e5fa501e5bc3ef55c76af7177b9dd27587fbc2e946ea9e8ef9aeaaff8c7c29c9417c1ba882497fffbd94fbcd0167670bda820679860eef965ee9c',
        'Content-Type': 'application/x-www-form-urlencoded'
    }),
  }).then(res => res.json());
  
    return ({ locale, doctors, services, blogs });
  }

export default function MainPage() {
    let { locale, doctors, services, blogs } = useLoaderData();

    let { t } = useTranslation();

  useChangeLanguage(locale);

    return (
        <>
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
        </>
    )
}
