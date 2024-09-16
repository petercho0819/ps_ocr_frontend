import React from "react";
import {
  Box,
  InputAdornment,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { LoginBack } from "../Icon/LoginBack";
import { IconEye } from "../Icon/IconEye";
import { IconSearch } from "../Icon/IconSearch";
import { color } from "@/theme/color";

type InputType =
  | "inputBox"
  | "lableBox"
  | "search"
  | "lableDown"
  | "date"
  | "textArea";
interface InputBoxProps {
  type?: InputType;
  labelText?: string;
  placeholderText?: string;
  error?: boolean;
  value?: string | number;
  disabled?: boolean;
  formType?: HTMLInputElement["type"];
  errorMsg?: string;
}

const InputBox: React.FC<InputBoxProps & TextFieldProps> = ({
  errorMsg,
  formType,
  type,
  value,
  labelText,
  disabled,
  placeholderText,
  error,
  onChange,
  ...props
}) => {
  const theme = useTheme<Theme>();

  const minHeight = type === "textArea" ? "64px" : "";

  const commonStyles = {
    color: "black",
    background: "white",
    borderRadius: "8px",
    width: "100%",
    height: "40px",
    "& input": {
      padding: "8px 4px",
      height: "24px",
      minHeight: minHeight,
      fontSize: "14px",
      fontFamily: "Hyundai Sans Text Regular",
      lineHeight: "20px",
      color: error ? ` ${color.secondary.active_red}` : color.text.black,
    },
    "& fieldset": {
      borderRadius: "8px",
      border: error
        ? `1px solid ${color.secondary.active_red}`
        : "1px solid #11111126",
    },
    "&:focus": {
      border: error
        ? `1px solid ${color.secondary.active_red}`
        : "1px solid #11111126",
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      border: error
        ? `1px solid ${color.secondary.active_red}`
        : "1px solid #11111126",
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      padding: "0",
    },

    "& .MuiFormLabel-root.MuiInputLabel-root": {
      fontFamily: "Hyundai Sans Head Regular",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "20px",
      letterSpacing: "0.15px",
    },
    "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
      color: "#11111166",
    },
    "& .MuiOutlinedInput-root:hover fieldset": {
      border: error
        ? `1px solid ${color.secondary.active_red}`
        : "1px solid #11111126",
    },
    "& input:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0 100px white inset",
      "-webkit-text-fill-color": "none",
      WebkitTextFillColor: color.text.black,
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <TextField
        sx={{
          ...commonStyles,
        }}
        type={formType}
        value={value}
        label={labelText}
        disabled={disabled}
        multiline={type === "textArea"}
        placeholder={
          type === "search"
            ? "Search"
            : type === "textArea"
            ? "· text area"
            : placeholderText
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {labelText === "Password" ? <IconEye /> : ""}
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="end">
              {type === "search" ? <IconSearch /> : ""}
            </InputAdornment>
          ),
        }}
        onChange={onChange}
        {...props}
      />

      {error ? (
        <Typography
          color="red"
          sx={{
            fontSize: "14px",
            fontFamily: "Hyundai Sans Text",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          {errorMsg}
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
};
InputBox.propTypes = {
  type: PropTypes.oneOf([
    "inputBox",
    "lableBox",
    "search",
    "lableDown",
    "date",
    "textArea",
  ]),
};

export default InputBox;
