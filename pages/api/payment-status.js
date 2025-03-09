import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "ID de session manquant" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // 🔹 Enregistrement du paiement dans Supabase
      const { data, error } = await supabase
        .from("payments")
        .insert([
          {
            session_id: session.id,
            user_email: session.customer_email,
            amount: session.amount_total / 100, // Convertir en €
            currency: session.currency,
            status: session.payment_status,
          },
        ]);

      if (error) {
        console.error("❌ [ERREUR Supabase] :", error);
        return res.status(500).json({ error: "Erreur lors de l'enregistrement du paiement" });
      }

      return res.status(200).json({ success: true, message: "Paiement validé et enregistré" });
    } else {
      return res.status(400).json({ success: false, message: "Paiement non validé" });
    }
  } catch (error) {
    console.error("❌ [Erreur Stripe] :", error);
    return res.status(500).json({ error: "Erreur lors de la récupération du paiement" });
  }
}
