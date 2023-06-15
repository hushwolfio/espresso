import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router-dom";

const DonationPage = lazy(() => import("@/routes/DonationPage"));
const Notfound = lazy(() => import("@/routes/404"));

export const routes: Array<RouteObject> = [
  {
    index: true,
    element: (
      <Suspense>
        <DonationPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense>
        <Notfound />
      </Suspense>
    ),
  },
];

export default routes;
