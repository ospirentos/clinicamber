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

  console.log("Doctor is: ", doctor);

  return (
    <>
      <img
        src={
          "http://cms.clinicamberd.com" +
          doctor.data[0]?.attributes.image.data.attributes.url
        }
        alt={doctor.data[0]?.attributes.image.data.attributes.alternativeText}
      ></img>
      {doctor.data[0]?.attributes.cvText.map((item, index) => (
        <RichTextRenderer key={index} {...item} />
      ))}
    </>
  );
}
