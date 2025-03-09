import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { email } = req.body; // ✅ Récupère l'email de l'utilisateur envoyé depuis le frontend

    if (!email) {
      return res.status(400).json({ error: "L'email de l'utilisateur est requis." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Produit Test",
            },
            unit_amount: 5000, // 50€ en centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email, // ✅ 🔥 Ajoute l'email de l'utilisateur ici
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    });

    console.log("🔗 [Stripe] URL de paiement :", session.url);
    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error("❌ [Erreur Stripe] :", error.message);
    return res.status(500).json({ error: error.message });
  }
}
