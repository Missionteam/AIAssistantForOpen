import React, { FC } from "react";
import { CSSProperties } from "react";

interface RoundedButtonProps {
  widthPadding?: string;
  text?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  border?: string;
  style?: CSSProperties;
}

const CustomButton: FC<RoundedButtonProps> = ({
  widthPadding = "20px",
  text = "Button",
  color = "white",
  backgroundColor = "black",
  borderRadius = "14px",
  border = "none",
  style = {},
}) => {
  const defaultStyles = {
    paddingLeft: widthPadding,
    paddingRight: widthPadding,
    borderRadius: borderRadius,
    color: color,
    backgroundColor: backgroundColor,
    border: border,
    cursor: "pointer",
    height: "40px",
    fontSize: "12px",
  };

  const combinedStyles = { ...defaultStyles, ...style };

  return <button style={combinedStyles}>{text}</button>;
};

export default CustomButton;
