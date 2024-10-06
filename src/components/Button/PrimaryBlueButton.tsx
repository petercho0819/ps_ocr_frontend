import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, ButtonProps } from "@mui/material";
import { color } from "@/theme/color";
import { font } from "@/theme/font";

type ButtonSize = "default" | "fontPlus" | "large";
interface ColorButtonProps extends Omit<ButtonProps, "size"> {
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonProps["type"];
  isActive?: boolean;
}

const styleObj: Record<ButtonSize, Record<string, string>> = {
  large: {
    width: "394px",
    height: "50px",
    padding: "15px",
    ...font.h6,
    borderRadius: "8px",
  },
  fontPlus: {
    width: "114px",
    height: "38px",
    fontFamily: "Hyundai Sans Head Regular",
    fontSize: "14.5px",
    lineHeight: "25px",
    borderRadius: "8px",
    padding: "7px 10px",
  },
  default: {
    width: "114px",
    height: "38px",
    fontFamily: "Hyundai Sans Head Regular",
    fontSize: "12px",
    borderRadius: "8px",
    padding: "7px 10px",
  },
};

const PrimaryBlueButton: React.FC<ColorButtonProps> = ({
  fullWidth = false,
  size = "default",
  disabled = false,
  text,
  type,
  isActive,
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
        background: color.primary.green,
        "&:hover": {
          color: color.grey.white,
          background: color.primary.green,
        },
        "&:focus": {
          color: color.grey.white,
          background: color.primary.green,
        },
        "&:disabled": {
          color: color.light_action_disabled,
          background: "#4C4E641F",
        },
        ...(isActive && {
          color: color.grey.white,
          background: color.primary.green,
        }),
        textTransform: "none",
      }}
      {...props}
    >
      <Box sx={{ display: "flex", gap: "8px" }}>{text}</Box>
    </Button>
  );
};
PrimaryBlueButton.propTypes = {
  size: PropTypes.oneOf(["fontPlus", "default", "large"]),
};

export default PrimaryBlueButton;
