import { Card, CardHeader, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link, useMatches } from "react-router";
import type { ServiceAttributes } from "~/models/service.model";
import type { RootLoader } from "~/root";

export function ServiceCard({ title, shortText, image, slug }: Partial<ServiceAttributes>) {
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;

  return (
    <Link to={`/services/${slug}`} className="min-w-[12rem] my-4 col-span-12 sm:col-span-4 lg:col-span-3 sm:h-[300px]">
      <Card
        className="min-w-[12rem] my-4 sm:col-span-12 sm:h-[300px]"
        isFooterBlurred
        isPressable
      >
        <CardHeader className=" z-10 top-1 flex-col ">
          <h4 className="text-black font-medium text-large">{title}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={ENV.WEB_CMS_BASE_URL + image?.data.attributes.url}
        />
        <CardFooter className="justify-center sm:justify-between bg-black/40 before:bg-white/10 border-white/20 overflow-hidden absolute bottom-0 w-full z-10">
          <p className="hidden sm:block sm:text-tiny sm:text-white/80">
            {shortText}
          </p>
          <div
            className="text-tiny text-white bg-black/20"
            color="default"
          >
            Daha Fazla
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
