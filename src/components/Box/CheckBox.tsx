import React from "react";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

interface FormControlLabelProps {
  labelText?: string;
}

const CheckBox: React.FC<FormControlLabelProps & CheckboxProps> = ({
  value,
  disabled,
  labelText,
  ...props
}) => {
  const commonStyles = {
    marginLeft: "0",
    "& .MuiTypography-root": {
      color: "#111111B2",
      fontFamily: "Hyundai Sans Text Regular",
      fontSize: "14px",
      fontWeight: "400",
    },
  };

  return (
    <FormControlLabel
      sx={{
        ...commonStyles,
      }}
      control={
        <Checkbox
          {...props}
          sx={{
            color: "#11111166",
            padding: "0 2px 0 2px",
          }}
        />
      }
      label={labelText}
    />
  );
};

export default CheckBox;
