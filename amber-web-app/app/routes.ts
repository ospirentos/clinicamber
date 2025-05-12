import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("doctors/:slug", "routes/doctor.tsx"),
  route("services/:slug", "routes/service.tsx"),
  route("blogs/:slug", "routes/blog.tsx"),
  route("kvkk", "routes/kvkk.tsx"),
  route("contact", "routes/contact.tsx"),
  route("*", "routes/notFound.tsx")
] satisfies RouteConfig;


