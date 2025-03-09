"use client";

import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "wJCtnTJsMmEC5x5cLNk59j", // Remplace avec ton Project ID
      token: "qZgK0XnkxjHij2aMbkS7yRok7N9WCJD5d7SyRwAPvY6aTwyGzlymWt9dRmmQt21nCdgJ9pa0Z7T3zOTVeEVKg" // Ton API Token
    }
  ],
});
