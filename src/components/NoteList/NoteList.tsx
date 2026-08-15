import css from "./NoteList.module.css";

import type { Item } from "../../types/types";

interface NoteListProps {
  items: Item[];
  onDelete: (id: string) => void;
}

export default function NoteList({ items, onDelete }: NoteListProps) {
  // console.log("id ", item.id);

  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      {items.map((item) => (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button className={css.button} onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
