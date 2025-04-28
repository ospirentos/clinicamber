import React from "react";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { useNavigate, useLoaderData } from "@remix-run/react";

export function DentistCard({ name, title, image, description, slug }) {
  let { WEB_CMS_BASE_URL } = useLoaderData();
  let navigate = useNavigate();
  return (
    <Card
      radius="lg"
      className="min-w-[8rem] my-4 sm:col-span-9 sm:col-span-3"
      isFooterBlurred
      isPressable
      onPress={() => navigate(`/doctors/${slug}`)}
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        src={ WEB_CMS_BASE_URL + image}
      />
      <CardFooter className="flex flex-col bg-black/10 shadow-small absolute bottom-0 z-10 p-1">
        <p className="text-tiny font-semibold text-white/80 mb-1">{name}</p>
        <p className="text-tiny font-semibold text-white/80">{title}</p>
      </CardFooter>
    </Card>
  );
}
