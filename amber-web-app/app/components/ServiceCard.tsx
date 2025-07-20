import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link, useMatches } from "react-router";
import type { ServiceAttributes } from "~/models/service.model";
import type { RootLoader } from "~/root";

export function ServiceCard({ title, image, slug }: Partial<ServiceAttributes>) {
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;

  return (
    <Link to={`/services/${slug}`} className="min-w-[12rem] max-w-xs my-4 col-span-12 sm:col-span-4 lg:col-span-4">
      <Card
        className="min-w-[12rem] max-w-xs w-full h-[300px]"
        isFooterBlurred
        isPressable
      >
        <CardHeader className="z-10 flex-col">
          <h5 className="text-black font-medium text-medium truncate w-full overflow-hidden whitespace-nowrap">{title}</h5>
        </CardHeader>
        <div className="flex-1 overflow-hidden">
          <Image
            removeWrapper
            alt="Card background"
            className="w-full h-full object-cover rounded-t-none"
            src={ENV.WEB_CMS_BASE_URL + image?.data.attributes.url}
          />
        </div>
      </Card>
    </Link>
  );
}
