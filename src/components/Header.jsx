import { useState } from "react";
import styles from "../assets/styles/layouts/Header.module.scss";
import Popover from "../components/Popover";

function Header() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Changer la valeur de l'état et re-render le composant <Header />
  };

  return (
    <header className="container-fluid border border-2 p-2 d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <a href="/">
          <img
            className="ms-3"
            src="https://svgsilh.com/svg/303194.svg"
            alt="logo"
            width={30}
          />
        </a>
      </div>

      <div
        id={styles.divButtons}
        className="d-flex flex-direction-row gap-4 gap-md-5 align-items-center"
      >
        <button
          type="button"
          className="btn btn-secondary d-flex align-items-center gap-2 rounded-3 p-3 text-white"
        >
          <i className="bi bi-heart-fill"></i>WishList
        </button>
        <button type="button" className="btn btn-dark">
          Connexion
        </button>
      </div>

      {/* Header mobile */}
      {isActive && <Popover onClick={() => setIsActive(false)} />}
      <i
        popoverTarget="my-popover"
        role="button"
        onClick={handleClick}
        id={styles.burgerIcon}
        className={`d-sm-block text-secondary d-md-none bi bi-${isActive ? "circle text-danger" : "list"} text-primary fs-1`}
      ></i>
    </header>
  );
}

export default Header;
