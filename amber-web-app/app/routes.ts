import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("doctors/:slug", "routes/doctor.tsx"),
  route("*", "routes/notFound.tsx")
] satisfies RouteConfig;


