"use client"; // ✅ Ce fichier est un Client Component

import dynamic from "next/dynamic";

// ✅ Charge PlasmicPage en tant que composant client
const PlasmicPage = dynamic(() => import("./PlasmicPage"), { ssr: false });

export default function PlasmicLoaderWrapper() {
  return <PlasmicPage />;
}
