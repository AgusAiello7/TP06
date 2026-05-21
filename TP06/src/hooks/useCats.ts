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
    const fetchCats = async () => { // fetchCatses una función asincrónica que se encargará de realizar la solicitud a la API para obtener las imágenes de gatos. Esta función se ejecutará una vez que la app inicie.
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=12"
        );
        const fetchedPosts: Post[] = response.data.map( // la respuesta de la API para se transforma en un array de objetos Post que se ajusten a la estructura definida en el tipo Post. 
          (cat: { id: string; url: string }, index: number) => ({
            id: cat.id,
            imageUrl: cat.url,
            username: FAKE_USERNAMES[index % FAKE_USERNAMES.length],
            caption: FAKE_CAPTIONS[index % FAKE_CAPTIONS.length],
            likes: Math.floor(Math.random() * 900), // se asigna un número aleatorio de "me gusta" entre 0 y 899 para cada publicación.
            date: new Date(
              Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000 // se asigna una fecha aleatoria dentro de la última semana para cada publicación. Es una funcnción obtenida de google.
            ).toLocaleDateString("es-AR"), //
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