import React, { ChangeEvent } from "react";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { color } from "@/theme/color";

interface CustomRadioGroupProps {
  defaultValue?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; label: string }[];
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  defaultValue,
  value,
  onChange,
  options,
}) => {
  return (
    <FormControl>
      <RadioGroup
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        row
        sx={{
          gap: "16px",
          "& .MuiButtonBase-root.MuiRadio-root.Mui-checked": {
            color: color.secondary.active_blue,
          },
          "& .MuiButtonBase-root.MuiRadio-root": {
            padding: "0 9px",
          },
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                color="secondary"
                sx={{ ":hover": { backgroundColor: "transparent " } }}
              />
            }
            label={
              <Typography variant="element6" color={color.text.black}>
                {option.label}
              </Typography>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
