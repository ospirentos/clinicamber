import { useLoaderData, useMatches } from "react-router"
import type { RootLoader } from "~/root";
import type { DoctorLoader } from "~/routes/doctor";
import { RichTextRenderer } from "./RichTextRenderer";

export function Doctor() {
  const { doctorData } = useLoaderData<DoctorLoader>();
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;
  return (
    <div className="flex flex-1 items-center w-full h-auto justify-center">
      <div className="px-6 w-full max-w-[1024px]">
        <div className="grid gap-4 grid-cols-24 grid-rows-1">
          <img
            className="col-span-8 justify-self-center w-80"
            src={
              ENV.WEB_CMS_BASE_URL +
              doctorData?.data[0]?.attributes.image.data.attributes.url
            }
            alt={doctorData?.data[0]?.attributes.image.data.attributes.alternativeText}
          ></img>
          <div className="col-start-10 col-span-14">
            <div className="text-lg font-thin mb-5">Meet The Doctor</div>
            {doctorData?.data[0]?.attributes.cvText.map((item, index) => (
              <RichTextRenderer key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}