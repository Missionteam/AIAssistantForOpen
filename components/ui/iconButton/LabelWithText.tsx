import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function LabelWithText({
  icon,
  text,
  styles,
  open,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  styles: any;
  open: boolean;
  selected: boolean;
    onClick?: any;
}) {
  return (
    <>
      <div
        className={`flex justify-start ${selected ? styles.selectedIcon : ""}`}
        style={{
          margin: open ? "0 10px 0 0" : "0 auto",
          paddingLeft: open ? "20px" : "0",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        {icon}
        {open ? <p className={`${styles.text}`}>{text}</p> : <></>}
        
      </div>
    </>
  );
}
