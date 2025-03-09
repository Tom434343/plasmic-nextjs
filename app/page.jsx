"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Homepage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);  // ✅ Vérifie si on est côté client

    useEffect(() => {
        setIsClient(true);  // ✅ Une fois monté, on autorise l'affichage
    }, []);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from("test_table").select("*");
            if (error) {
                console.error("⚠️ Erreur Supabase :", error);
                setError(error.message);
            } else {
                console.log("📢 Données reçues :", data);
                setData(data);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    // ✅ Empêche Next.js de pré-afficher du HTML incorrect
    if (!isClient) return null;  

    return (
        <div>
            <h1>✅ Test de connexion Supabase</h1>
            {isLoading ? (
                <p>⏳ Chargement des données...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>⚠️ Erreur : {error}</p>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}
