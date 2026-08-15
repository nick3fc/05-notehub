import css from "./SearchBox.module.css";
// import toast, { Toaster } from "react-hot-toast";

// interface SearchBarProps {
//   onSubmit: (searchString: string) => void;
// }
export default function SearchBox() {
  // const handleSubmit = (formData: FormData) => {
  //   const searchString = (formData.get("query") as string).trim();
  //   if (searchString === "") {
  //     toast("Please enter your search query.", {
  //       style: {
  //         background: "#def1a1",
  //         color: "#000000",
  //       },
  //     });
  //   } else {
  //     onSubmit(searchString);
  //     //   console.log("searchBar sent", searchString);
  //   }
  // };

  return (
    <>
      <input className={css.input} type="text" placeholder="Search notes" />
    </>
  );
}
