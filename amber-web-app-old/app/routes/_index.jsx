import React from "react";
import { useLoaderData, useMatches } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { SectionTitle } from "../components/SectionTitle";
import { DentistCard } from "../components/DentistCard";
import { ServiceCard } from "../components/ServiceCard";
import { BlogCard } from "../components/BlogCard";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import { Button } from "@heroui/button";
import i18next from "../i18next.server";
import { Map } from "../components/GoogleMap";
import { WhatsAppFloatingButton } from "../images/WhatsAppFloatingButton";
import banner from "../images/main-bg-darker.png";
import { GoogleReview } from "../components/GoogleReview";
import { ContactUsForm } from "../components/ContactUsForm";
import GoogleContentCache from "../cache.server";

export async function loader({ request }) {
  let locale = await i18next.getLocale(request);
  const apiUrl = process.env.API_URL;
  const publicToken = process.env.PUBLIC_WEB_TOKEN;
  const WEB_CMS_BASE_URL = process.env.WEB_CMS_BASE_URL;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const GOOGLE_API_KEY_SSR = process.env.GOOGLE_API_KEY_SSR;
  const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (GoogleContentCache.has('google-place-data')) {
    console.log('Cache hit, using data', GoogleContentCache.get('google-place-data'));
  } else {
    console.log('Cache miss, Saving google places data to cache');
    let googleReviews = await fetch(
      "https://maps.googleapis.com/maps/api/place/details/json?" +
        new URLSearchParams({
          fields: "reviews",
          reviews_no_translations: true,
          place_id: GOOGLE_PLACE_ID,
          key: GOOGLE_API_KEY_SSR,
        })
    ).then((res) => res.json());
    GoogleContentCache.set('google-place-data', googleReviews, 86400);
  }


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

  let blogs = await fetch(
    apiUrl +
      "blogs?" +
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

  return {
    locale,
    doctors,
    blogs,
    WEB_CMS_BASE_URL,
    GOOGLE_API_KEY,
    googleReviews: GoogleContentCache.get('google-place-data'),
  };
}

export async function action({ request }) {
  const body = await request.formData();
  const extractedFormData = Object.fromEntries(body.entries());
  const message = `*İsim Soyisim:* ${extractedFormData.name}\n*Telefon Numarası:* ${extractedFormData.tel}\n*Mesajım:*\n${extractedFormData.message}\n`;
  const redirectUrl = `https://wa.me/905527138204?text=${encodeURIComponent(message)}`;

  return redirect(redirectUrl);
}

export default function MainPage() {
  const matches = useMatches();
  const rootData = matches.find((match) => match.id === "root");
  const { locale, doctors, blogs, googleReviews } = useLoaderData();
  const services = rootData?.data?.services;
  let { t } = useTranslation();
  useChangeLanguage(locale);

  return (
    <>
      <div className="relative text-center overflow-hidden max-w-[1080px] m-auto">
        <img
          src={banner}
          alt={t("bannerAltText", "three pictures of clinic amber")}
          className="w-[1080px]"
        />
        <div className="mx-auto sm:absolute top-[calc(50%-144px)] left-16 max-w-[400px]">
          <div className="font-vollkorn italic mt-4 text-amber-500 sm:text-4xl">
            "{t("bannerSideText")}"
          </div>
          <div className="hidden sm:block font-vollkorn italic mt-2 text-white text-xl">
            {t("bannerDescriptionText")}
          </div>
          <div className="flex justify-around max-w-[360px] mx-auto my-4">
            <Button className="bg-amber-500 text-white">
              {t("bannerButtonAppoint")}
            </Button>
            <Button className="bg-white text-amber-500 border border-amber-500 ">
              {t("bannerButtonContactUs")}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full h-auto justify-center">
        <div className="px-6 w-full max-w-[1024px]">
          <SectionTitle title={t("doctors")} />
          <div className="flex gap-4 overflow-x-auto sm:max-w-[900px] sm:gap-6 sm:grid sm:grid-cols-12 sm:grid-rows-auto px-8">
            {doctors.data.map((doctor, index) => (
              <DentistCard
                key={`${doctor.id}`}
                image={doctor.attributes.image.data.attributes.url}
                name={doctor.attributes.name}
                title={doctor.attributes.role}
                slug={doctor.attributes.slug}
              />
            ))}
          </div>
          <SectionTitle title={t("services")} />
          <div className="flex gap-4 overflow-x-auto sm:max-w-[900px] sm:gap-2 sm:grid sm:grid-cols-12 sm:grid-rows-auto px-8">
            {services.data.map((service, index) => (
              <ServiceCard
                key={`${service.id}`}
                image={service.attributes.image.data.attributes.url}
                title={service.attributes.title}
                shortText={service.attributes.shortText}
                slug={service.attributes.slug}
              />
            ))}
          </div>
          <div className="mb-4" id="blog"></div>
          <SectionTitle title={t("blog")}/>
          <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-auto px-8">
            {blogs.data.map((blog, index) => (
              <BlogCard
                key={`${blog.id}`}
                image={blog.attributes.image.data.attributes.url}
                firstTitle={blog.attributes.firstTitle}
                secondTitle={blog.attributes.secondTitle}
                slug={blog.attributes.slug}
              />
            ))}
          </div>
          <SectionTitle title={t("Google")} />
          <div className="flex gap-4 overflow-x-auto px-4 amber-scroll">
            {googleReviews.result?.reviews.map((review, index) => ( 
              review.author_name !== 'Fatih M. (learstyleR)' &&
              <GoogleReview key={index} reviewData={review} />
            ))}
          </div>
          <SectionTitle title={t("contact")} />
          <div className="flex gap-8 flex-wrap">
            <div className="w-full sm:w-1/2">
              <h2 className="text-xl">{t("addressTitle")}</h2>
              <p className="my-4">
                {t("addressLine1")}
                <br />
                <br />
                {t("addressLine2")}
              </p>
              <Map />
            </div>
            <div className="w-full sm:w-2/5 sm:flex-auto" id="contactUs">
              <h2 className="text-xl">{t("contactUsTitle")}</h2>
              <div className="flex justify-center flex-col"><ContactUsForm /></div>
            </div>
          </div>
        </div>
        <div className="z-20 fixed right-4 bottom-6 lg:right-[calc(50%-512px)] sm:top-20 pointer-events-none">
          <a
            className="pointer-events-auto"
            href={t("whatsappLink", "https://wa.me/905527138204")}
          >
            <WhatsAppFloatingButton />
          </a>
        </div>
      </div>
    </>
  );
}
