import css from "./MovieGrid.module.css";

import type { Item } from "../../types/types";

interface MovieGridProps {
  onSelect: (movie: Item) => void;
  movies: Item[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  //   console.log("grid received ", movies);

  return (
    <ul className={css.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map((movie: Item) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div id={`card-${movie.id}`} className={css.card}>
            <img
              className={css.image}
              src={`${import.meta.env.VITE_TMDB_IMGPATH}${movie.tag}`}
              alt={`movie ${movie.title}`}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
