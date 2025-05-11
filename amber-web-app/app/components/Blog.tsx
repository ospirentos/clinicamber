import { useLoaderData, useMatches } from "react-router";
import type { RootLoader } from "~/root";
import type { BlogLoader } from "~/routes/blog";
import { RichTextRenderer } from "./RichTextRenderer";

export function Blog() {
  const { blogData } = useLoaderData<BlogLoader>();
  const matches = useMatches();
  const { ENV } = matches.find((match) => match.id === "root")?.data as RootLoader;
  return (
    <div className="flex flex-1 items-center w-full h-auto justify-center">
      <div className="px-6 w-full max-w-[1024px]">
        {blogData && (
          <><img
            src={
              ENV.WEB_CMS_BASE_URL +
              blogData.data[0]?.attributes.image.data.attributes.url
            }
            alt={blogData.data[0]?.attributes.image.data.attributes.alternativeText}
          ></img>
            {blogData.data[0]?.attributes.fullText.map((item, index) => (
              <RichTextRenderer key={index} {...item} />
            ))}</>
        )}
      </div>
    </div>
  );
}