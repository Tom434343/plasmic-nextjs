"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleCheckout = async () => {
    if (!session || !session.user.email) {
      alert("Vous devez être connecté pour payer.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email, // ✅ Envoi de l'email
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // 🔥 Redirection vers Stripe Checkout
      } else {
        console.error("❌ Erreur de paiement :", data.error);
        alert("Erreur de paiement !");
      }
    } catch (error) {
      console.error("❌ Erreur de connexion :", error);
      alert("Erreur de connexion !");
    }
    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Redirection..." : "💳 Payer 50€"}
    </button>
  );
}
