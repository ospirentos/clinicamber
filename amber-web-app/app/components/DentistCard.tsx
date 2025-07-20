import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link, useMatches } from "react-router";
import type { DoctorAttributes } from "~/models/doctor.model";
import type { RootLoader } from "~/root";

export function DentistCard({ name, role, image, slug }: Partial<DoctorAttributes>) {
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;
  return (
    <Link to={`/doctors/${slug}`} className="min-w-[8rem] my-4 sm:col-span-3 sm:h-[300px]">
      <Card
        radius="lg"
        className="min-w-[12rem] my-4 sm:col-span-3"
        isFooterBlurred
        isPressable
      >
        <Image
          alt="doctor image"
          className="object-cover"
          src={ENV.WEB_CMS_BASE_URL + image?.data.attributes.url}
        />
        <CardFooter className="flex flex-col bg-black/10 shadow-small absolute bottom-0 z-10 p-1">
          <p className="text-tiny font-semibold text-white/80 mb-1">{name}</p>
          <p className="text-tiny font-semibold text-white/80">{role}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
