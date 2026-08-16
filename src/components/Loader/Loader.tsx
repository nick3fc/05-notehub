import css from "./Loader.module.css";

export default function Loader() {
  // console.log("loader");
  return <p className={css.text}>Loading movies, please wait...</p>;
}
