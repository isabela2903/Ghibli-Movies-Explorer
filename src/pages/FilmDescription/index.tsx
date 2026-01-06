import { useParams } from "react-router-dom";
import type { Film } from "../../types/type";
import { useEffect, useState } from "react";

export const FilmDescription = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(
          `https://ghibliapi.vercel.app/films/${id}`
        );
        const film = await response.json();
        setFilm(film);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFilms();
  }, [id]);

  if (loading) return <p className="text-center">Carregando filme...</p>;
  if (!film) return <p className="text-center">Filme não encontrado.</p>;

  return (
    <div className="flex flex-col items-center gap-3 max-w-150 p-5 bg-neutral-200 rounded-xl m-4 sm:mx-auto">
      <p className="text-xl font-bold">{film.title}</p>
      <img
        src={film.movie_banner}
        className="rounded-lg"
      />
      <p className="max-w-150 text-center"><span className="font-bold">Description: </span> {film.description}</p>
      <p><span className="font-bold">Director: </span>{film.director}</p>
      <p><span className="font-bold">Producer: </span>{film.producer}</p>
      <p><span className="font-bold">Release date: </span>{film.release_date}</p>
      <p><span className="font-bold">Raiting score: </span>{film.rt_score}</p>
    </div>
  );
};
