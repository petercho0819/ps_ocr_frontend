import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, ButtonProps } from "@mui/material";
import { color } from "@/theme/color";
import { font } from "@/theme/font";

type ButtonSize = "largeHigh" | "default" | "small";

interface ColorButtonProps extends Omit<ButtonProps, "size"> {
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonProps["type"];
}

const styleObj: Record<ButtonSize, Record<string, string>> = {
  largeHigh: {
    width: "120px",
    height: "56px",
    borderRadius: "8px",
    ...font.h6,
    padding: "7px 10px",
  },
  default: {
    width: "114px",
    height: "38px",
    borderRadius: "8px",
    fontFamily: "Hyundai Sans Head Regular",
    fontSize: "12px",
    padding: "7px 10px",
  },
  small: {
    width: "91px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    textTransform: "none",
    fontFamily: "Hyundai Sans Text Regular",
    fontSize: "14px",
  },
};

const GenericButton: React.FC<ColorButtonProps> = ({
  fullWidth = false,
  size = "default",
  disabled = false,
  text,
  type,

  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    if (!isFocused) {
      setIsHovered(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlurFocus = () => {
    setIsFocused(false);
    setIsHovered(false);
  };

  const backgroundColor = text === "DELETE" ? "#E63312" : "#00AAD2";

  return (
    <Button
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      onFocus={handleFocus}
      onBlur={handleBlurFocus}
      sx={{
        ...styleObj[size],
        color: color.grey.white,
        background: backgroundColor,
        "&:hover": {
          color: "#FFFFFF",
          background: backgroundColor,
        },
        "&:focus": {
          color: "#FFFFFF",
          background: backgroundColor,
        },
        "&:disabled": {
          color: "#FFFFFF",
          background: "#B7B7B7",
        },
        textTransform: "none",
      }}
      {...props}
    >
      <Box sx={{ display: "flex", gap: "8px" }}>{text}</Box>
    </Button>
  );
};

GenericButton.propTypes = {
  size: PropTypes.oneOf(["largeHigh", "default", "small"]),
};

export default GenericButton;
