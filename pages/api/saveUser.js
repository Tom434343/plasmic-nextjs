import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid"; // Importer UUID

export default async function handler(req, res) {
  console.log("🔍 [API] Requête reçue sur /api/saveUser");

  if (req.method !== "POST") {
    console.error("❌ [ERREUR] Méthode non autorisée !");
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { user } = req.body;
  if (!user || !user.email) {
    console.error("❌ [ERREUR] Données utilisateur invalides :", user);
    return res.status(400).json({ message: "Données utilisateur invalides" });
  }

  try {
    console.log("📡 [INFO] Vérification si l'utilisateur existe déjà :", user.email);

    // ✅ 1️⃣ Vérifier si l'utilisateur existe déjà dans Supabase
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("id")
      .eq("email", user.email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    // ✅ 2️⃣ Déterminer l'ID à utiliser (existant ou nouveau)
    const userId = existingUser?.id || uuidv4();

    console.log("📡 [INFO] Enregistrement/MAJ dans Supabase :", { id: userId, email: user.email });

    // ✅ 3️⃣ Mettre à jour ou insérer l'utilisateur
    const { data, error } = await supabase
      .from("users")
      .upsert([{ id: userId, email: user.email, name: user.name || "Utilisateur inconnu" }]);

    if (error) {
      console.error("❌ [ERREUR Supabase] :", error.message);
      throw error;
    }

    console.log("✅ [SUCCÈS] Utilisateur enregistré :", data);
    res.status(200).json({ message: "Utilisateur enregistré", data });

  } catch (error) {
    console.error("❌ [ERREUR INTERNE] :", error.message);
    res.status(500).json({ message: "Erreur interne", error: error.message });
  }
}
