"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setIsLoading(true);
      fetch("/api/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: session.user }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Utilisateur enregistré :", data))
        .catch((err) => console.error("Erreur lors de l'enregistrement :", err))
        .finally(() => setIsLoading(false));
    }
  }, [session]);

  if (session) {
    return (
      <div>
        <p>✅ Connecté en tant que : <strong>{session.user.email}</strong></p>
        {isLoading && <p>⏳ Enregistrement en cours...</p>}
        <button onClick={() => signOut()}>🚪 Se déconnecter</button>
      </div>
    );
  }

  return <button onClick={() => signIn("github")}>🔑 Se connecter avec GitHub</button>;
}
