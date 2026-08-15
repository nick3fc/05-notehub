import { useEffect } from "react";
import { createPortal } from "react-dom";

import NoteForm from "../NoteForm/NoteForm";

import css from "../Modal/Modal.module.css";
// import type { Item } from "../../types/types";

interface ModalProps {
  ModalClose: () => void;
  // movie: Item;
}

export default function Modal({ ModalClose }: ModalProps) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        ModalClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "auto";
    };
  }, [ModalClose]);

  // ------------------------------------------------------------

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={ModalClose}
    >
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <NoteForm closeClick={() => ModalClose()} />
      </div>
    </div>,
    document.body,
  );
}
