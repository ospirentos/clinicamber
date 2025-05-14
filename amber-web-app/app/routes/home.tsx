import { redirect } from "react-router";
import type { Route } from "./+types/home";
import NodeCache from "node-cache";
import MainPageContents from "~/components/main-page-contents/MainPageContents";
import type { BlogRequestModel } from "~/models/blog.model";
import type { GoogleReview } from "~/models/google.model";
import { allowedLanguages, fallbackLanguage } from "~/root";

export interface HomeLoader {
  googleReviews: GoogleReview;
  blogs: BlogRequestModel;
}

const cache = new NodeCache();

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Amber Ağız ve Diş Sağlığı Polikliniği" },
    { name: "description", content: "ClinicAmber Websitesine Hoş Geldiniz" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const rawLocale = request.headers.get('accept-language')?.split(',')[0] || fallbackLanguage;
  let locale = rawLocale.split('-')[0];
  if (!allowedLanguages.includes(locale)) locale = fallbackLanguage;

  //load google content
  const cacheKey = "google-place-data";
  let data = cache.get(cacheKey);

  if (!data) {
    console.log('Google Reviews: Cache miss, Saving google places data to cache');
    let googleReviews = await fetch(
      "https://maps.googleapis.com/maps/api/place/details/json?" +
      new URLSearchParams({
        fields: "reviews",
        reviews_no_translations: "true",
        ...(process.env.GOOGLE_PLACE_ID && { place_id: process.env.GOOGLE_PLACE_ID }),
        ...(process.env.GOOGLE_API_KEY_SSR && { key: process.env.GOOGLE_API_KEY_SSR }),
      })
    ).then((res) => res.json());

    if (googleReviews.status !== 'OK') {
      console.error('Google API: ', googleReviews.error_message);
    } else {
      cache.set(cacheKey, googleReviews, 86400);
      console.log('Google Reviews: Saved google places data to cache.');
    }

  } else {
    console.log('Google Reviews: Cache hit, using the cache data');
  }

  const apiUrl = process.env.API_URL;
  const publicToken = process.env.PUBLIC_WEB_TOKEN;

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

  return { googleReviews: cache.get(cacheKey), blogs } as HomeLoader;
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.formData();
  const extractedFormData = Object.fromEntries(body.entries());
  const message = `*İsim Soyisim:* ${extractedFormData.name}\n*Telefon Numarası:* ${extractedFormData.tel}\n*Mesajım:*\n${extractedFormData.message}\n`;
  const redirectUrl = `https://wa.me/905527138204?text=${encodeURIComponent(message)}`;

  return redirect(redirectUrl);
}

export default function Home() {
  return <MainPageContents />;
}
