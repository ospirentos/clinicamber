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
import { useEffect, useRef, useState } from "react";
import banner from "../../assets/main-bg-darker.png";
import dentistLocationIcon from "../../assets/dental-care-location.svg";
import smilingDentistIcon from "../../assets/smiling-dentist.svg";
import denstisChairIcon from "../../assets/denstist-chair.svg";
import contactUsIcon from "../../assets/contact-us.svg";
import phoneIcon from "../../assets/phone.svg";
import whatsappIcon from "../../assets/whatsapp.svg";
import { Button } from "@heroui/react";
import { Slide } from "react-slideshow-image";

export default function MainPageContents() {
  const [isWhatsAppButtonVisible, setIsWhatsAppButtonVisible] = useState(false);
  const whatsappButtonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsWhatsAppButtonVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (whatsappButtonRef.current) {
      observer.observe(whatsappButtonRef.current);
    }
    return () => {
      if (whatsappButtonRef.current) {
        observer.unobserve(whatsappButtonRef.current);
      }
    };
  }, []);
  const { t } = useTranslation();
  const { googleReviews, blogs } = useLoaderData<HomeLoader>();
  const matches = useMatches();
  const { services, doctors } = matches.find((match) => match.id === "root")?.data as RootLoader;
  return (
    <>
      <div className="relative w-full text-center overflow-hidden">
        <Slide autoplay infinite duration={5000} indicators canSwipe>
          <div
            className="flex items-center justify-center bg-cover h-[600px] w-full"
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
          <div
            className="flex items-center justify-center bg-cover h-[600px] w-full"
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
        </Slide>
      </div>
      <div className="flex items-center w-full h-auto justify-center">
        <div className="px-6 w-full max-w-[1024px]">
          <SectionTitle title={t("aboutUs")} />
          <div className="mb-16 flex sm:flex-row flex-col items-center gap-8">
            <img src={dentistLocationIcon} className="h-[100px]" />
            <span>{t('mainPageClinicamberDesc')}</span>
          </div>
          <div className="mb-16 flex sm:flex-row flex-col items-center gap-8">
            <img src={denstisChairIcon} className="h-[100px]" />
            <div>{t('mainPageComfortDesc')}</div>
          </div>
          <div className="mb-16 flex sm:flex-row flex-col items-center gap-8">
            <img src={smilingDentistIcon} className="h-[100px]" />
            <div>{t('mainPageSmileDesc')}</div>
          </div>
          <div className="sm:flex-row sm:gap-16 w-full flex flex-col justify-center items-center gap-4">
            <a href="tel:+905527138204" className="">
              <Button variant="light" className=" text-amber-500 border border-amber-500 w-[240px]" size="lg">
                <img src={phoneIcon} className="h-5" />+90 552 713 82 04
              </Button>
            </a>
            <Button variant="light" className="bg-white text-amber-500 border border-amber-500 w-[240px]" size="lg"
              onPress={() => {
                const el = document.getElementById('contactUs');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
              <img src={contactUsIcon} />{t("bannerButtonContactUs")}
            </Button>
            <a ref={whatsappButtonRef} href={t("whatsappLink", "https://wa.me/905527138204")} >
              <Button
                style={{ backgroundColor: "white", borderColor: "#25D366", color: "#25D366" }}
                className="text-white border w-[240px]"
                size="lg"
              >
                <img src={whatsappIcon} className="h-5" />{t("buttonWhatsApp")}
              </Button>
            </a>
          </div>

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
        <div
          className={`z-20 fixed right-4 bottom-6 lg:right-[calc(50%-720px)] sm:top-20 pointer-events-none transition-all duration-500 ease-in-out ${isWhatsAppButtonVisible ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}
          style={{ willChange: 'opacity, transform' }}
        >
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
