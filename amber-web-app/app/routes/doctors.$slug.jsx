import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  return params.slug;
};

export default function Doctor() {
  const slug = useLoaderData();
  console.log("slug", slug);

  return <div>Bu sayfa bilgisini içeriyor</div>;
}
