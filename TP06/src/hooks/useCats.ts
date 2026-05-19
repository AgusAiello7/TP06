import { useState, useEffect } from "react";
import axios from "axios";
import type { Post } from "../types";

const FAKE_USERNAMES = [
   "Gregory", "Einstein___", "felino_chad",
  "Gribsman", "Bataaaa", "El_Syrupppp", "Cabo_Gustavo",
  "CalaMortizzzzzz", "suculento666"
];

const FAKE_CAPTIONS = [
  "Lunes de siesta 😴", "El jefe de la casa 🐾",
  "No me molestes 😤", "Solo vine a dormir aquí",
  "Mirando el mundo pasar 🌍", "Este soy yo a las 8am",
  "Supervisando el trabajo desde casa 💻",
  "El arte de no hacer nada 🎨", "Cargando... 🔋",
  "Mi cara los lunes 😒"
];

const FAKE_COMMENTS = [
  { id: "c1", username: "gatito99", text: "Qué hermoso! 😍" },
  { id: "c2", username: "cat_world", text: "Me encanta esta foto" },
  { id: "c3", username: "purrfect", text: "🐱🐱🐱" },
];

export const useCats = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=12"
        );
        const fetchedPosts: Post[] = response.data.map(
          (cat: { id: string; url: string }, index: number) => ({
            id: cat.id,
            imageUrl: cat.url,
            username: FAKE_USERNAMES[index % FAKE_USERNAMES.length],
            caption: FAKE_CAPTIONS[index % FAKE_CAPTIONS.length],
            likes: Math.floor(Math.random() * 900),
            date: new Date(
              Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
            ).toLocaleDateString("es-AR"),
            comments: FAKE_COMMENTS,
          })
        );
        setPosts(fetchedPosts);
      } catch (err) {
        setError("Error al cargar las imágenes");
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  return { posts, loading, error };
};