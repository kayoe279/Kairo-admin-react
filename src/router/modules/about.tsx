import About from "@/routes/about/index";
import type { AppRouteObject } from "@/types";

export const aboutRoutes: AppRouteObject[] = [
  {
    path: "/about",
    element: <About />,
    meta: {
      name: "aboutIndex",
      icon: "solar:info-circle-broken",
      sort: 8,
    },
  },
];
