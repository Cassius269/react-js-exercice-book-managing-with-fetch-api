import popoverStyles from "../assets/styles/layouts/PopOver.module.scss";

const popover = ({ onClick }) => {
  return (
    <>
      <div className="position-relative" onClick={onClick}>
        <ul popover="" id="my-popover" className={popoverStyles.myPopover}>
          <li>
            <a role="button" href="#">
              WishList
            </a>
          </li>
          <li>
            <a role="button" href="#">
              Connexion
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default popover;
