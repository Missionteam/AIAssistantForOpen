import styles from "./css/NavMenu.module.css";

export default function NavItem({
  title,
  imgPath,
  onClick,
  selectedNumber,
  myNumber,
}: {
  title: string;
  imgPath?: String;
  onClick?: () => void;
  selectedNumber?: number;
  myNumber?: number;
}) {
  return (
    <>
      <div
        className={`${styles.navItem} ${
          selectedNumber == myNumber ? styles.navItemSelected : styles.navItem
        } flex w-full items-center justify-start }`}
        onClick={onClick}
      >
        {imgPath ? <img src={`/nav-menu/${imgPath}`} alt="" /> : <></>}
        <p>{title}</p>
      </div>
    </>
  );
}
