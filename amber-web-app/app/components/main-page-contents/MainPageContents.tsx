import { useTranslation } from "react-i18next";
import { SectionTitle } from "../section-title/SectionTitle";
import { GoogleReview } from "../google-review/GoogleReview";
import { useLoaderData, useMatches } from "react-router";
import type { HomeLoader } from "~/routes/home";
import type { RootLoader } from "~/root";
import { ServiceCard } from "../ServiceCard";
import { DentistCard } from "../DentistCard";
import { BlogCard } from "../BlogCard";
import { Map } from "../GoogleMap";
import { ContactUsForm } from "../ContactUsForm";
import { WhatsAppFloatingButton } from "~/assets/WhatsAppFloatingButton";
import banner from "../../assets/main-bg-darker.png";
import { Button } from "@heroui/react";

export default function MainPageContents() {
  const { t } = useTranslation();
  const { googleReviews, blogs } = useLoaderData<HomeLoader>();
  const matches = useMatches();
  const { services, doctors } = matches.find((match) => match.id === "root")?.data as RootLoader;
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
            {doctors?.data?.map((doctor, index) => (
              <DentistCard
                key={`${doctor.id}`}
                image={doctor.attributes.image}
                name={doctor.attributes.name}
                role={doctor.attributes.role}
                slug={doctor.attributes.slug}
              />
            ))}
          </div>
          <SectionTitle title={t("services")} />
          <div className="flex gap-4 overflow-x-auto sm:max-w-[900px] sm:gap-2 sm:grid sm:grid-cols-12 sm:grid-rows-auto px-8">
            {services?.data?.map((service) => (
              <ServiceCard
                key={`${service.id}`}
                image={service.attributes.image}
                title={service.attributes.title}
                shortText={service.attributes.shortText}
                slug={service.attributes.slug}
              />
            ))}
          </div>
          <SectionTitle title={t("blog")} />
          <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-auto px-8">
            {blogs?.data?.map((blog, index) => (
              <BlogCard
                key={`${blog.id}`}
                image={blog.attributes.image}
                firstTitle={blog.attributes.firstTitle}
                secondTitle={blog.attributes.secondTitle}
                slug={blog.attributes.slug}
              />
            ))}
          </div>
          <SectionTitle title={t("Google")} />
          <div className="flex gap-4 overflow-x-auto px-4 amber-scroll">
            {googleReviews?.result?.reviews?.map((review, index) => (
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
  )
}