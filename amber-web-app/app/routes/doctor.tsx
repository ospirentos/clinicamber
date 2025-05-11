import { Doctor } from "~/components/Doctor";
import type { Route } from "./+types/doctor";
import type { DoctorRequestModel } from "~/models/doctor.model";

export interface DoctorLoader {
  doctorData: DoctorRequestModel | null;
  error: string | null;
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale = request.headers.get('accept-language')?.split(',')[0] || 'tr-TR';
  const slug = params.slug;

  if (slug) {
    let doctor = await fetch(
      process.env.API_URL +
        "doctors?" +
        new URLSearchParams({
          locale: locale,
          "populate[image][fields][0]": "url",
          "populate[image][fields][1]": "alternativeText",
          "filters[slug][$eq]": slug,
        }),
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.PUBLIC_WEB_TOKEN,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    ).then((res) => res.json());

    return { doctorData: doctor, error: null};
  }

  return {doctorData: null, error: 'Failed to load doctor data'};
}

export default function Doctors() {
  return <Doctor />;
}