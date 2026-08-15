import css from "./NoteForm.module.css";

import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";

import { createItem } from "../../services/noteService";
// import type { Item } from "../../types/types";

interface closeClickProps {
  closeClick: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),

  content: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(500, "Content must be at most 500 characters")
    .required("Content is required"),

  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Easter Egg"),
});

export default function NoteForm({ closeClick }: closeClickProps) {
  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      tag: "Todo",
    },
    validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        setStatus("");

        await createItem(values);
        await queryClient.invalidateQueries({
          queryKey: ["items"],
        });
        closeClick();
      } catch (error) {
        setStatus("Create Note Failed");
        return error;
      }
    },
  });

  // ------------------------------------------------------------

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      {formik.status && <span className={css.error}>{formik.status}</span>}

      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.title && (
          <span className={css.error}>{formik.errors.title}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.content && (
          <span className={css.error}>{formik.errors.content}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={formik.values.tag}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.errors.tag && (
          <span className={css.error}>{formik.errors.tag}</span>
        )}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={closeClick}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={formik.isSubmitting}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
