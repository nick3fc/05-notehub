import { useEffect } from "react";
import { createPortal } from "react-dom";

import css from "../Modal/Modal.module.css";

interface ModalProps {
  onModalClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onModalClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onModalClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "auto";
    };
  }, [onModalClose]);

  // ------------------------------------------------------------

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onModalClose}
    >
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        {/* <NoteForm closeClick={() => onModalClose()} /> */}
        {children}
      </div>
    </div>,
    document.body,
  );
}
