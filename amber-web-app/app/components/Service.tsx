import { Accordion, AccordionItem } from "@heroui/react";
import { RichTextRenderer } from "./RichTextRenderer";
import { useLoaderData, useMatches } from "react-router";
import type { ServiceLoader } from "~/routes/service";
import type { RootLoader } from "~/root";

export function Service() {
  const { serviceData } = useLoaderData<ServiceLoader>();
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;
  return (

    <div className="flex flex-1 items-center w-full h-auto justify-center">
      <div className="px-6 w-full max-w-[1024px]">
        {serviceData && (
          <>
            <img
              src={
                ENV.WEB_CMS_BASE_URL +
                serviceData.data[0].attributes.image.data.attributes.url
              }
              alt={serviceData.data[0].attributes.image.data.attributes.alternativeText}
            />
            {serviceData.data[0].attributes.longText.map((item, index) => (
              <RichTextRenderer key={index} {...item} />
            ))}
            <Accordion>
              {serviceData.data[0].attributes.qaList.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={
                    <span className="font-vollkorn text-xl">{item.question}</span>
                  }
                  textValue={item.question}
                >
                  {item.answer.map((answer, index) => (
                    <RichTextRenderer key={index} {...answer} />
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
            {serviceData.data[0].attributes.qaFinalizeText.map((item, index) => (
              <RichTextRenderer key={index} {...item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}