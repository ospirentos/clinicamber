import React from "react";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { useNavigate } from "@remix-run/react";

export function BlogCard({ firstTitle, secondTitle, image, slug }) {
  let navigate = useNavigate();
  return (
    <Card
      className={`col-span-12 sm:col-span-4 h-[300px]`}
      isPressable
      onPress={() => navigate(`/blogs/${slug}`)}
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
        src={"http://cms.clinicamberd.com" + image}
      />
    </Card>
  );
}
