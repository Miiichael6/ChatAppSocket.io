import css from "../css/Loader.module.css"

const Loader = () => {
  return (
    <div className={css.screen_loader}>
      <span className={css.loader}></span>
    </div>
  );
};

export default Loader;
