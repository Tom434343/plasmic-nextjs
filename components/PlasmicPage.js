"use client"; // ✅ Indique que ce composant est côté client

import { PlasmicComponent, PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "../plasmic-init";

export default function PlasmicPage() {
  return (
    <PlasmicRootProvider loader={PLASMIC}>
      <PlasmicComponent component="Homepage" />
    </PlasmicRootProvider>
  );
}
