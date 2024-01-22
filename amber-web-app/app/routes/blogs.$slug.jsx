import { useLoaderData } from "@remix-run/react";
import i18next from "../i18next.server";
import { RichTextRenderer } from "../components/RichTextRenderer";

export const loader = async ({ params, request }) => {
  let locale = await i18next.getLocale(request);
  const apiUrl = process.env.API_URL;
  const publicToken = process.env.PUBLIC_WEB_TOKEN;
  let blog = await fetch(
    apiUrl +
      "blogs?" +
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
  return { blog };
};

export default function Blog() {
  const { blog } = useLoaderData();

  console.log("Blog is: ", blog);

  return (
    <>
      <img
        src={
          "http://cms.clinicamberd.com" +
          blog.data[0]?.attributes.image.data.attributes.url
        }
        alt={blog.data[0]?.attributes.image.data.attributes.alternativeText}
      ></img>
      {blog.data[0]?.attributes.fullText.map((item, index) => (
        <RichTextRenderer key={index} {...item} />
      ))}
    </>
  );
}
