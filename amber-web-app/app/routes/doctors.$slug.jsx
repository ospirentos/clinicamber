import { useLoaderData } from "@remix-run/react";
import i18next from "../i18next.server";
import { RichTextRenderer } from "../components/RichTextRenderer";

export const loader = async ({ params, request }) => {
  let locale = await i18next.getLocale(request);
  const apiUrl = process.env.API_URL;
  const publicToken = process.env.PUBLIC_WEB_TOKEN;
  let doctor = await fetch(
    apiUrl +
      "doctors?" +
      new URLSearchParams({
        locale: locale,
        "populate[image][fields][0]": "url",
        "populate[image][fields][1]": "alternativeText",
        "filters[slug][$eq]": params.slug,
      }),
    {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + publicToken,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    }
  ).then((res) => res.json());
  return { doctor };
};

export default function Doctor() {
  const { doctor } = useLoaderData();

  return (
    <>
      <div className="grid gap-4 grid-cols-24 grid-rows-1">
        <img
          className="col-span-8 justify-self-center w-80"
          src={
            "http://cms.clinicamberd.com" +
            doctor.data[0]?.attributes.image.data.attributes.url
          }
          alt={doctor.data[0]?.attributes.image.data.attributes.alternativeText}
        ></img>
        <div className="col-start-10 col-span-14">
          <div className="text-lg font-thin mb-5">Meet The Doctor</div>
          {doctor.data[0]?.attributes.cvText.map((item, index) => (
            <RichTextRenderer key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
