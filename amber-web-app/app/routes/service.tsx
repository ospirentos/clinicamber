import { Service } from "~/components/Service";
import type { Route } from "./+types/service";
import type { ServiceRequestModel } from "~/models/service.model";

export interface ServiceLoader {
  serviceData: ServiceRequestModel | null;
  error: string | null;
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const locale = request.headers.get('accept-language')?.split(',')[0] || 'tr-TR';
  const apiUrl = process.env.API_URL;
  let service = await fetch(
    apiUrl +
    "services?" +
    new URLSearchParams({
      locale: locale,
      "populate[image][fields][0]": "url",
      "populate[image][fields][1]": "alternativeText",
      "populate[qaList][fields][0]": "question",
      "populate[qaList][fields][1]": "answer",
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

  return { serviceData: service, error: null };
};

export default function Services() {
  return <Service />;
}