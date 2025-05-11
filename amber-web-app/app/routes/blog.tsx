import type { BlogRequestModel } from "~/models/blog.model";
import type { Route } from "./+types/blog";
import { Blog } from "~/components/Blog";

export interface BlogLoader {
  blogData: BlogRequestModel | null;
  error: string | null;
}

export const loader = async ({ params, request }: Route.LoaderArgs): Promise<BlogLoader> => {
  const locale = request.headers.get('accept-language')?.split(',')[0] || 'tr-TR';
  const apiUrl = process.env.API_URL;
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
        Authorization: "Bearer " + process.env.PUBLIC_WEB_TOKEN,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    }
  ).then((res) => res.json());

  return { blogData: blog, error: null };
};

export default function Doctors() {
  return <Blog />;
}