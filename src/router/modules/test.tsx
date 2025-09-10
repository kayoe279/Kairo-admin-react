import TestIcons from "@/routes/test-icons";
import type { AppRouteObject } from "@/types";

export const testRoutes: AppRouteObject[] = [
  {
    path: "/test/icons",
    element: <TestIcons />,
    meta: {
      name: "testIcons",
      icon: "solar:stars-minimalistic-broken",
      sort: 99,
    },
  },
];
