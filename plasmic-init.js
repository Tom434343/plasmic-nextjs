import { PlasmicRootProvider } from "@plasmicapp/react-web";
import { useEffect, useState } from "react";

export default function PlasmicWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p>Chargement en cours...</p>;
  }

  return <PlasmicRootProvider>{children}</PlasmicRootProvider>;
}
