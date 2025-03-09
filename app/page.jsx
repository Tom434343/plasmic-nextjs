"use client";

import React from "react";
import dynamic from "next/dynamic";
import LoginButton from "@/components/LoginButton"; // ✅ Bouton de connexion
import CheckoutButton from "@/components/CheckoutButton"; // ✅ Bouton de paiement
import { SessionProvider } from "next-auth/react"; // ✅ Ajout du provider

const PlasmicHomepage = dynamic(() => import("@/components/plasmic/dashboard_app/PlasmicHomepage"), {
  ssr: false, // 🔥 Désactive le SSR ici
});

export default function Homepage() {
  return (
    <SessionProvider>
      <div>
        <h1>Bienvenue sur mon site</h1>
        <LoginButton /> {/* 🔹 Bouton de connexion */}
        <CheckoutButton /> {/* 🔹 Bouton de paiement */}
        <PlasmicHomepage />
      </div>
    </SessionProvider>
  );
}
