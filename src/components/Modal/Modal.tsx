import { useEffect } from "react";
import { createPortal } from "react-dom";

import css from "../MovieModal/MovieModal.module.css";

import type { Item } from "../../types/types";

interface MovieModalProps {
  onClose: () => void;
  movie: Item;
}

export default function MovieModal({ onClose, movie }: MovieModalProps) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`${import.meta.env.VITE_TMDB_IMGPATH}${movie.tag}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.tag}</p>
          <p>
            <strong>Release Date:</strong> {movie.tag}
          </p>
          <p>
            <strong>Rating:</strong> {movie.tag}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
