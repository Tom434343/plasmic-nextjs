"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessComponent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Validation du paiement en cours...");

  useEffect(() => {
    if (!sessionId) {
      setMessage("Session de paiement invalide.");
      setLoading(false);
      return;
    }

    // Vérifier le statut du paiement via Stripe
    async function checkPaymentStatus() {
      try {
        const response = await fetch(`/api/payment-status?session_id=${sessionId}`);
        const data = await response.json();

        if (data.success) {
          setMessage("🎉 Paiement réussi ! Merci pour votre achat.");
        } else {
          setMessage("❌ Problème avec le paiement. Contactez le support.");
        }
      } catch (error) {
        setMessage("❌ Erreur lors de la vérification du paiement.");
      } finally {
        setLoading(false);
      }
    }

    checkPaymentStatus();
  }, [sessionId]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{message}</h1>
      <a href="/">Retour à l'accueil</a>
    </div>
  );
}
