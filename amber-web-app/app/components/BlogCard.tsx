import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link, useMatches } from "react-router";
import type { BlogAttributes } from "~/models/blog.model";
import type { RootLoader } from "~/root";

export function BlogCard({ firstTitle, secondTitle, image, slug }: Partial<BlogAttributes>) {
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;
  return (
    <Link to={`/blogs/${slug}`} className="col-span-12 sm:col-span-4 h-[300px]">
      <Card
        className={`col-span-12 sm:col-span-4 h-[300px]`}
        isPressable
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {firstTitle}
          </p>
          <h4 className="text-white font-medium text-large">{secondTitle}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={ENV.WEB_CMS_BASE_URL + image?.data.attributes.url}
        />
      </Card>
    </Link>
  );
}
