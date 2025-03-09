"use client"; // ✅ Assure que cette page est exécutée uniquement côté client

import * as React from "react";
import { useSearchParams, useParams } from "next/navigation";
import { PageParamsProvider as PageParamsProvider__ } from "@plasmicapp/host";
import dynamic from "next/dynamic";

// ✅ Chargement dynamique de PlasmicHomepage pour éviter l'hydratation serveur
const PlasmicHomepage = dynamic(
  () => import("../components/plasmic/dashboard_app/PlasmicHomepage"),
  { ssr: false } // ✅ Désactive le rendu serveur (évite l'erreur d'hydratation)
);

function Homepage() {
  // ✅ Récupération dynamique des paramètres uniquement côté client
  const params = useParams() || {};
  const searchParams = useSearchParams();

  // ✅ Transformation propre de searchParams en objet
  const searchParamsObj = React.useMemo(() => {
    return searchParams ? Object.fromEntries(searchParams.entries()) : {};
  }, [searchParams]);

  return (
    <PageParamsProvider__ params={params} query={searchParamsObj}>
      <PlasmicHomepage />
    </PageParamsProvider__>
  );
}

export default Homepage;
