import { useEffect, useState } from "react";
import type { Film } from "../../types/type";
import { Link } from "react-router-dom";

export const Home = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://ghibliapi.vercel.app/films");
        const film = await response.json();
        setFilms(film);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (loading) return <p className="text-center">Carregando filmes...</p>;

  films.sort((a, b) =>
    a.title.localeCompare(b.title, "en", { sensitivity: "base" })
  );

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 m-4">
      {films.slice(0, 10).map((f) => (
        <Link to={`/film/${f.id}`} key={f.id} className="bg-neutral-200 rounded-lg overflow-hidden transition-transform duration-300 hover:translate-y-1.25 p-3 text-center">
          <div>
            <p className="text-xl mb-3 font-bold">{f.title}</p>
            <img src={f.movie_banner} className="rounded-lg" />
          </div>
        </Link>
      ))}
    </section>
  );
};
