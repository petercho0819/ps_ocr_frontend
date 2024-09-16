import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, ButtonProps } from "@mui/material";
import { IconReorder } from "../Icon/IconReorder";

type ButtonSize = "maxl" | "xl" | "default" | "small" | "xs";
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
  maxl: {
    minWidth: "300px",
    height: "48px",
    fontFamily: "Hyundai Sans Head Regular",
    fontSize: "16px",
    justifyContent: "start",
    borderRadius: "8px",
    padding: "12px",
  },
  xl: {
    width: "216px",
    height: "48px",
    fontFamily: "Hyundai Sans Head Regular",
    fontSize: "16px",
    justifyContent: "start",
    borderRadius: "8px",
    padding: "12px",
  },
  default: {
    width: "148px",
    height: "48px",
    fontFamily: "Hyundai Sans Head Regular",
    fontSize: "16px",
    borderRadius: "8px",
    padding: "12px",
  },
  small: {
    height: "50px",
    fontSize: "12px",
    borderRadius: "8px",
    padding: "12px",
  },
  xs: {
    height: "26px",
    fontSize: "12px",
    borderRadius: "4px",
    padding: "4px",
  },
};

const LightSandButton: React.FC<ColorButtonProps> = ({
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
        color: "#11111166",
        "&:focus": {
          background: "#F6F3F2",
          color: "#111111",
        },
        "&:hover": {
          background: "#F6F3F2",
          color: "#111111",
        },
        ...(isActive && {
          background: "#F6F3F2",
          color: "#111111",
        }),
        textTransform: "none",
      }}
      {...props}
    >
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {isHovered ? <IconReorder /> : <Box sx={{ width: "24px" }} />}
        {text}
      </Box>
    </Button>
  );
};
LightSandButton.propTypes = {
  size: PropTypes.oneOf(["maxl", "xl", "default", "small", "xs"]),
};

export default LightSandButton;
