import { useLoaderData } from "react-router"
import type { DoctorLoader } from "~/routes/doctor";

export function Doctor() {
  const { data } = useLoaderData<DoctorLoader>();
  return <>{JSON.stringify(data)}</>
}