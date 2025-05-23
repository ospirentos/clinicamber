import React from "react";
import { Card, CardHeader, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { useNavigate, useLoaderData } from "@remix-run/react";

export function ServiceCard({ title, shortText, image, slug }) {
  let { WEB_CMS_BASE_URL } = useLoaderData();
  let navigate = useNavigate();

  return (
    <Card
      className="min-w-[12rem] my-4 sm:col-span-12 sm:col-span-4 sm:h-[300px]"
      isFooterBlurred
      isPressable
      onPress={() => navigate(`/services/${slug}`)}
    >
      <CardHeader className=" z-10 top-1 flex-col ">
        <h4 className="text-black font-medium text-large">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={WEB_CMS_BASE_URL + image}
      />
      <CardFooter className="justify-center sm:justify-between bg-black/40 before:bg-white/10 border-white/20 overflow-hidden absolute bottom-0 w-full z-10">
        <p className="hidden sm:block sm:text-tiny sm:text-white/80">
          {shortText}
        </p>
        <div
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Daha Fazla
        </div>
      </CardFooter>
    </Card>
  );
}
